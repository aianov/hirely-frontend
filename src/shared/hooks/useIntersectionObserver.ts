import { useEffect, useRef, useState } from 'react'

interface Options {
   root?: HTMLElement | null
   rootMargin?: string
   threshold?: number | number[]
}

type UseIntersectionObserver = [
   (node: HTMLElement | null) => void,
   IntersectionObserverEntry | undefined,
   boolean // флаг для отслеживания, было ли действие выполнено
]

export const useIntersectionObserver = (
   options: Options = {}
): UseIntersectionObserver => {
   const [entry, setEntry] = useState<IntersectionObserverEntry>()
   const [node, setNode] = useState<HTMLElement | null>(null)
   const [hasIntersected, setHasIntersected] = useState<boolean>(false)

   const observer = useRef<IntersectionObserver | null>(null)

   useEffect(() => {
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(([entry]) => {
         setEntry(entry)
         if (entry.isIntersecting) {
            setHasIntersected(true)
         }
      }, options)

      const { current: currentObserver } = observer

      if (node) currentObserver.observe(node)

      return () => currentObserver.disconnect()
   }, [node, options])

   return [setNode, entry, hasIntersected]
}
