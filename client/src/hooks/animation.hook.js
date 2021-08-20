import { useCallback, useState } from "react"

export const useAnimation = () => {
   const [animate, setAnimate] = useState(false)
   const timeout = 300

   const setAnimation = useCallback(() => {
      setAnimate(true)
      setTimeout(() => {
         setAnimate(false)
      }, timeout)
   }, [])

   return { animate, setAnimation, timeout }
}