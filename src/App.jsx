import { useEffect, useState } from 'react'
import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import NewsCard from './components/NewsCard'
import SkeletonCard from './components/SkeletonCard'
import GithubTrending from './components/GithubTrending'
import Footer from './components/Footer'
import useNewsFeed from './hooks/useNewsFeed'
import useGithubTrending from './hooks/useGithubTrending'
import useBookmarks from './hooks/useBookmarks'
import useInfiniteScroll from './hooks/useInfiniteScroll'

const NEWS_PAGE_SIZE = 4

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [bookmarksOnly, setBookmarksOnly] = useState(false)
  const [theme, setTheme] = useState('dark')
  const toggleTheme = () =>
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  const news = useNewsFeed()
  const github = useGithubTrending()
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks()

  const term = searchTerm.trim().toLowerCase()

  const filteredNews = news.articles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory

    const matchesSearch =
      article.title.toLowerCase().includes(term) ||
      article.category.toLowerCase().includes(term)

    const matchesBookmarks = !bookmarksOnly || isBookmarked(article.id)

    return matchesCategory && matchesSearch && matchesBookmarks
  })

  const filteredRepos = github.repos.filter((repo) => {
    if (!term) return true
    return (
      repo.name.toLowerCase().includes(term) ||
      repo.description.toLowerCase().includes(term) ||
      repo.language.toLowerCase().includes(term)
    )
  })

  const { visibleCount, sentinelRef, reset } = useInfiniteScroll(
    filteredNews.length,
    NEWS_PAGE_SIZE
  )

  useEffect(() => {
    reset()
  }, [selectedCategory, term, bookmarksOnly, news.articles, reset])

  const visibleNews = filteredNews.slice(0, visibleCount)

  const refreshAll = () => {
    news.refresh()
    github.refresh()
  }

  const mutedText = theme === 'dark' ? 'text-slate-400' : 'text-slate-600'

  return (
    <div
      className={
        theme === 'dark'
          ? 'flex min-h-screen flex-col bg-slate-950 text-white'
          : 'flex min-h-screen flex-col bg-white text-slate-900'
      }
    >
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        theme={theme}
        onToggleTheme={toggleTheme}
        lastUpdated={news.lastUpdated}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 p-6">
        <h2 className="text-3xl font-bold">Trending Technology News</h2>

        <p className={`mt-2 ${mutedText}`}>
          Latest technology stories from around the world, via the Hacker News API.
        </p>

        {news.isFallback && !news.loading && (
          <p className="mt-3 rounded-lg bg-amber-500/10 px-4 py-2 text-sm text-amber-500">
            Live news feed is unavailable right now - showing sample stories instead.
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            theme={theme}
          />

          <button
            type="button"
            onClick={() => setBookmarksOnly((current) => !current)}
            className={`rounded-full border px-4 py-2 text-sm ${
              bookmarksOnly
                ? 'border-blue-600 bg-blue-600 text-white'
                : theme === 'dark'
                ? 'border-slate-700 hover:bg-slate-800'
                : 'border-slate-300 hover:bg-slate-100'
            }`}
          >
            🔖 Bookmarks ({bookmarks.length})
          </button>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {news.loading
            ? Array.from({ length: NEWS_PAGE_SIZE }).map((_, index) => (
                <SkeletonCard key={index} theme={theme} />
              ))
            : visibleNews.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  theme={theme}
                  isBookmarked={isBookmarked(article.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
        </div>

        {!news.loading && filteredNews.length === 0 && (
          <p className={`mt-6 ${mutedText}`}>No stories match your filters.</p>
        )}

        {visibleCount < filteredNews.length && (
          <div ref={sentinelRef} className="h-10" />
        )}

        <GithubTrending
          repos={filteredRepos}
          loading={github.loading}
          isFallback={github.isFallback}
          theme={theme}
        />
      </main>

      <Footer
        totalLoaded={filteredNews.length}
        onRefresh={refreshAll}
        theme={theme}
      />
    </div>
  )
}

export default App
