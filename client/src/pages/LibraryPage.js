import { useCallback, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

import '../styles/LibraryPage.scss'

export const LibraryPage = () => {
   const { request } = useHttp()
   const { signOut, token } = useContext(AuthContext)
   const [pictures, setPictures] = useState(null)

   const getData = useCallback(async () => {
      try {
         const data = await request('/library', 'GET', null, {
            Authorization: `Bearez ${token}`
         })
         setPictures(data)
      } catch (e) {
         toast.error(e.message)
         if (e.message === 'jwt expired') {
            signOut()
         }
      }
   }, [request, signOut, token])

   useEffect(() => {
      getData()
   }, [getData])

   return (
      <div className='container'>
         <div className='library'>
            {pictures && pictures.map((picture, index) => (
               <div key={index} className='library__item'>
                  <img src={picture.url} alt={picture.name} />
               </div>
            ))}
         </div>
      </div>
   )
}