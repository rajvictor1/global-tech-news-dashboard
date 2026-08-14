export function timeAgo(unixSeconds) {
  if (!unixSeconds) return 'just now'

  const diffMs = Date.now() - unixSeconds * 1000
  const minutes = Math.floor(diffMs / 60000)

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} min ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`

  const days = Math.floor(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

export function domainFromUrl(url) {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return 'news.ycombinator.com'
  }
}

// Hacker News stories don't carry a category, so we guess one from the
// title using simple keyword matching. It's an approximation, not live data.
const CATEGORY_KEYWORDS = [
  ['AI', /\b(ai|artificial intelligence|machine learning|llm|gpt|openai|neural|anthropic|claude)\b/i],
  ['Cybersecurity', /\b(security|hack|breach|vulnerab|cve|ransomware|exploit|malware)\b/i],
  ['Cloud', /\b(cloud|aws|azure|gcp|kubernetes|serverless)\b/i],
  ['Mobile', /\b(ios|android|iphone|mobile app|app store)\b/i],
  ['Web Dev', /\b(react|javascript|typescript|css|html|web dev|browser|frontend|vue|svelte)\b/i],
  ['Startups', /\b(startup|funding|raises|series [abc]|venture|y ?combinator)\b/i],
]

export function guessCategory(title) {
  const match = CATEGORY_KEYWORDS.find(([, pattern]) => pattern.test(title))
  return match ? match[0] : 'Programming'
}

// No article body is available from the feed, so reading time is a rough
// estimate based on headline length, not a measured statistic.
export function estimateReadingTime(title) {
  const wordCount = title.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(2, Math.round(wordCount / 3))
  return `${minutes} min read`
}
