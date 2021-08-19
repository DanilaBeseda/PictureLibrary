import { useState, useCallback, useEffect } from 'react'

export const useAuth = () => {
   const [token, setToken] = useState(null)
   const [userId, setUserId] = useState(null)

   const signIn = useCallback((jwtToken, id) => {
      setToken(jwtToken)
      setUserId(id)

      localStorage.setItem('userData', JSON.stringify({ userId: id, token: jwtToken }))
   }, [])

   const signOut = useCallback(() => {
      setToken(null)
      setUserId(null)

      localStorage.removeItem('userData')
   }, [])

   useEffect(() => {
      const data = JSON.parse(localStorage.getItem('userData'))

      if (data && data.token) {
         signIn(data.token, data.userId)
      }
   }, [signIn])

   return { signIn, signOut, token, userId }
}