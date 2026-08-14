// Fallback data only, used when the live GitHub search request fails.
// Growth values are illustrative and clearly labeled as sample, never
// shown as if they were real GitHub statistics.
const sampleRepos = [
  {
    id: 'sample-1',
    name: 'demo-org/awesome-ai-tools',
    url: 'https://github.com',
    stars: 12500,
    language: 'Python',
    description: 'Sample fallback data - a curated list of AI developer tools.',
    growth: '+320 today (sample)',
    isLive: false,
  },
  {
    id: 'sample-2',
    name: 'demo-org/lightweight-web-framework',
    url: 'https://github.com',
    stars: 8900,
    language: 'JavaScript',
    description: 'Sample fallback data - a minimal framework for building fast web apps.',
    growth: '+210 today (sample)',
    isLive: false,
  },
  {
    id: 'sample-3',
    name: 'demo-org/cloud-native-toolkit',
    url: 'https://github.com',
    stars: 6400,
    language: 'Go',
    description: 'Sample fallback data - utilities for deploying cloud-native services.',
    growth: '+95 today (sample)',
    isLive: false,
  },
  {
    id: 'sample-4',
    name: 'demo-org/secure-auth-starter',
    url: 'https://github.com',
    stars: 4300,
    language: 'TypeScript',
    description: 'Sample fallback data - a starter kit for secure authentication flows.',
    growth: '+60 today (sample)',
    isLive: false,
  },
]

export default sampleRepos
