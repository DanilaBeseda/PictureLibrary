import { useCallback, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { AuthContext } from '../context/AuthContext'
import { LibraryContext } from '../context/LibraryContext'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'

import '../styles/LibraryPage.scss'

export const LibraryPage = () => {
   const { loading, request } = useHttp()
   const { signOut, token } = useContext(AuthContext)
   const { animate } = useContext(LibraryContext)
   const [pictures, setPictures] = useState(null)

   const controller = new AbortController()
   const getData = useCallback(async () => {
      try {
         const data = await request('/library', 'GET', null, {
            Authorization: `Bearez ${token}`
         }, controller.signal)
         setPictures(data)
      } catch (e) {
         toast.error(e.message)
         if (e.message === 'jwt expired') {
            signOut()
         }
      }
      //if i put controller.signal in dep, it will loop forever
      // eslint-disable-next-line react-hooks/exhaustive-deps  
   }, [request, signOut, token])

   useEffect(() => {
      getData()

      return () => controller.abort()
      //if i put controller in dep, it will loop forever
      // eslint-disable-next-line react-hooks/exhaustive-deps  
   }, [getData])

   const cls = ['library']
   if (animate) {
      cls.push('exit-animation')
   }

   return (
      <div className='container'>
         {!loading
            ? <div className={cls.join(' ')}>
               {pictures && pictures.map((picture, index) => (
                  <div key={index} className='library__item'>
                     <span>{picture.name}</span>
                     <img src={picture.url} alt={picture.name} />
                  </div>
               ))}
            </div>
            : <Loader />
         }
      </div>
   )
}