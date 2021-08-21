import { useCallback, useState } from "react"

export const useAnimation = () => {
   const [animate, setAnimate] = useState(false)
   const timeout = 300

   const setAnimation = useCallback((bool) => {
      setAnimate(bool)
   }, [])

   return { animate, setAnimation, timeout }
}