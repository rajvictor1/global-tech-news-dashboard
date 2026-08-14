import RepoCard from './RepoCard'
import SkeletonCard from './SkeletonCard'

function GithubTrending({ repos, loading, isFallback, theme }) {
  const mutedText = theme === 'dark' ? 'text-slate-400' : 'text-slate-600'

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold">GitHub Trending</h2>
      <p className={`mt-2 ${mutedText}`}>
        Popular repositories active in the last 7 days, via the public GitHub Search API.
      </p>

      {isFallback && !loading && (
        <p className="mt-3 rounded-lg bg-amber-500/10 px-4 py-2 text-sm text-amber-500">
          Live GitHub data is unavailable right now - showing sample repositories instead.
        </p>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} theme={theme} hasImage={false} />
            ))
          : repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} theme={theme} />
            ))}
      </div>

      {!loading && repos.length === 0 && (
        <p className={`mt-6 ${mutedText}`}>No repositories to show.</p>
      )}
    </section>
  )
}

export default GithubTrending
