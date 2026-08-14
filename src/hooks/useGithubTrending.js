import { useCallback, useEffect, useState } from 'react'
import sampleRepos from '../data/sampleRepos'

// GitHub's official search API (no token needed, CORS-enabled). There is no
// free "trending" endpoint, so we approximate it with popular repositories
// that have been pushed to recently. This does not include today's star
// growth - GitHub's public API doesn't expose that number.
function buildEndpoint() {
  const since = new Date()
  since.setDate(since.getDate() - 7)
  const sinceDate = since.toISOString().slice(0, 10)
  const query = encodeURIComponent(`stars:>500 pushed:>${sinceDate}`)
  return `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=12`
}

function transformRepo(repo) {
  return {
    id: repo.id,
    name: repo.full_name,
    url: repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language || 'Unknown',
    description: repo.description || 'No description provided.',
    growth: null, // not available from the free public search API
    isLive: true,
  }
}

function useGithubTrending() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFallback, setIsFallback] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(buildEndpoint())
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()
      const items = Array.isArray(data.items) ? data.items : []
      if (items.length === 0) {
        throw new Error('No live repositories returned')
      }

      setRepos(items.map(transformRepo))
      setIsFallback(false)
    } catch (err) {
      setRepos(sampleRepos)
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

  return { repos, loading, error, isFallback, lastUpdated, refresh: load }
}

export default useGithubTrending
