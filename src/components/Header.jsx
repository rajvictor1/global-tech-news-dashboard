function Header({ searchTerm, onSearchChange, theme, onToggleTheme, lastUpdated }) {
  return (
    <header
      className={
        theme === 'dark'
          ? 'border-b border-slate-800 bg-slate-950 px-6 py-4 text-white'
          : 'border-b border-slate-200 bg-white px-6 py-4 text-slate-900'
      }
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            TechPulse
          </h1>

          <p
            className={
              theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-600'
            }
          >
            Global Tech News Dashboard
          </p>

          {lastUpdated && (
            <p
              className={
                theme === 'dark' ? 'text-xs text-slate-500' : 'text-xs text-slate-400'
              }
            >
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search news & repositories..."
            className={
              theme === 'dark'
                ? 'w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white outline-none focus:border-blue-500 md:w-80'
                : 'w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500 md:w-80'
            }
          />

          <button
            type="button"
            onClick={onToggleTheme}
            className={
              theme === 'dark'
                ? 'rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800'
                : 'rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100'
            }
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header