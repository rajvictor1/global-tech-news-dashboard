import useLocalStorage from './useLocalStorage'

function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage('techpulse-bookmarks', [])

  const isBookmarked = (id) => bookmarks.some((item) => item.id === id)

  const toggleBookmark = (article) => {
    setBookmarks((current) =>
      current.some((item) => item.id === article.id)
        ? current.filter((item) => item.id !== article.id)
        : [...current, article]
    )
  }

  return { bookmarks, isBookmarked, toggleBookmark }
}

export default useBookmarks
