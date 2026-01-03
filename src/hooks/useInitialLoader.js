import { useEffect, useState } from "react"

export const useInitialLoader = (delay = 3000) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
    const timer = setTimeout(() => setLoading(false), delay)
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    }
  }, [loading])

  return loading
}
