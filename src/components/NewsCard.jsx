function NewsCard({ article, theme, isBookmarked, onToggleBookmark }) {
  return (
    <article
      className={
        theme === 'dark'
          ? 'overflow-hidden rounded-xl border border-slate-800 bg-slate-900'
          : 'overflow-hidden rounded-xl border border-slate-200 bg-white'
      }
    >
      <div className="relative">
        <img
          src={article.thumbnail}
          alt=""
          className="h-48 w-full object-cover"
        />

        <button
          type="button"
          onClick={() => onToggleBookmark(article)}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-lg text-white hover:bg-black/80"
        >
          {isBookmarked ? '🔖' : '☆'}
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-blue-400">
            {article.category}
          </span>

          {!article.isLive && (
            <span className="rounded-full bg-amber-500/20 px-2 py-1 text-xs font-medium text-amber-500">
              Sample
            </span>
          )}
        </div>

        <h3 className="mt-2 text-xl font-bold">
          {article.title}
        </h3>

        <p
          className={
            theme === 'dark' ? 'mt-3 text-sm text-slate-400' : 'mt-3 text-sm text-slate-600'
          }
        >
          {article.source} · {article.published} · {article.readingTime}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Read
        </a>
      </div>
    </article>
  )
}

export default NewsCard