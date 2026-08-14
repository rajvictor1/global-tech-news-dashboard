import { useCallback, useEffect, useState } from 'react'
import sampleNews from '../data/sampleNews'
import { domainFromUrl, estimateReadingTime, guessCategory, timeAgo } from '../utils/newsUtils'

// Hacker News' public Algolia search API - no key, CORS-enabled, real live data.
const HN_ENDPOINT = 'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=60'

function transformHit(hit) {
  const url = hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`
  const title = hit.title || 'Untitled story'

  return {
    id: `hn-${hit.objectID}`,
    title,
    source: hit.url ? domainFromUrl(hit.url) : 'news.ycombinator.com',
    category: guessCategory(title),
    published: timeAgo(hit.created_at_i),
    readingTime: estimateReadingTime(title),
    thumbnail: `https://picsum.photos/seed/hn-${hit.objectID}/600/400`,
    url,
    points: hit.points,
    isLive: true,
  }
}

function useNewsFeed() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFallback, setIsFallback] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(HN_ENDPOINT)
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()
      const hits = Array.isArray(data.hits) ? data.hits : []
      if (hits.length === 0) {
        throw new Error('No live stories returned')
      }

      setArticles(hits.map(transformHit))
      setIsFallback(false)
    } catch (err) {
      // Live feed unavailable (network/CORS/etc) - fall back to clearly
      // labeled sample data so the dashboard never shows a blank screen.
      setArticles(sampleNews.map((article) => ({ ...article, isLive: false })))
      setIsFallback(true)
      setError(err.message)
    } finally {
      setLastUpdated(new Date())
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(load, 0)
    return () => clearTimeout(timeoutId)
  }, [load])

  return { articles, loading, error, isFallback, lastUpdated, refresh: load }
}

export default useNewsFeed
