function SkeletonCard({ theme, hasImage = true }) {
  const pulse = theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'
  const wrapper =
    theme === 'dark'
      ? 'overflow-hidden rounded-xl border border-slate-800 bg-slate-900'
      : 'overflow-hidden rounded-xl border border-slate-200 bg-white'

  return (
    <div className={`${wrapper} animate-pulse`}>
      {hasImage && <div className={`h-48 w-full ${pulse}`} />}

      <div className="space-y-3 p-5">
        <div className={`h-4 w-16 rounded ${pulse}`} />
        <div className={`h-5 w-full rounded ${pulse}`} />
        <div className={`h-5 w-2/3 rounded ${pulse}`} />
        <div className={`h-4 w-1/2 rounded ${pulse}`} />
        <div className={`h-9 w-24 rounded ${pulse}`} />
      </div>
    </div>
  )
}

export default SkeletonCard
