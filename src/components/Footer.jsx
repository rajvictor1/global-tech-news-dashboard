function Footer({ totalLoaded, onRefresh, theme }) {
  const wrapper =
    theme === 'dark'
      ? 'border-t border-slate-800 bg-slate-950 text-slate-400'
      : 'border-t border-slate-200 bg-white text-slate-600'

  return (
    <footer className={wrapper}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-6 text-sm md:flex-row md:justify-between">
        <p>{totalLoaded} stories loaded</p>

        <button
          type="button"
          onClick={onRefresh}
          className={
            theme === 'dark'
              ? 'rounded-lg border border-slate-700 px-3 py-2 hover:bg-slate-800'
              : 'rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-100'
          }
        >
          🔄 Refresh
        </button>

        <p>
          Sources: Hacker News (Algolia API) · GitHub Search API. Built with
          React, Vite &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  )
}

export default Footer
