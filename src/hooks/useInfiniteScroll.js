import { useCallback, useEffect, useRef, useState } from 'react'

function useInfiniteScroll(totalCount, pageSize = 4) {
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const sentinelRef = useRef(null)

  const reset = useCallback(() => setVisibleCount(pageSize), [pageSize])

  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((current) => Math.min(current + pageSize, totalCount))
      }
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [totalCount, pageSize])

  return { visibleCount: Math.min(visibleCount, totalCount), sentinelRef, reset }
}

export default useInfiniteScroll
