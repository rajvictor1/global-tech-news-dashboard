function RepoCard({ repo, theme }) {
  const wrapper =
    theme === 'dark'
      ? 'rounded-xl border border-slate-800 bg-slate-900 p-5'
      : 'rounded-xl border border-slate-200 bg-white p-5'

  const mutedText = theme === 'dark' ? 'text-slate-400' : 'text-slate-600'

  return (
    <article className={wrapper}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-bold break-all">{repo.name}</h3>

        {!repo.isLive && (
          <span className="shrink-0 rounded-full bg-amber-500/20 px-2 py-1 text-xs font-medium text-amber-500">
            Sample
          </span>
        )}
      </div>

      <p className={`mt-2 text-sm ${mutedText}`}>{repo.description}</p>

      <p className={`mt-3 text-sm ${mutedText}`}>
        ⭐ {repo.stars.toLocaleString()} · {repo.language}
        {repo.growth ? ` · ${repo.growth}` : ''}
      </p>

      <a
        href={repo.url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
      >
        View on GitHub
      </a>
    </article>
  )
}

export default RepoCard
