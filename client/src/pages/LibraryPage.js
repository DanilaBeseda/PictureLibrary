import { useCallback, useContext, useEffect, useState } from 'react'
import { Route, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AuthContext } from '../context/AuthContext'
import { LibraryContext } from '../context/LibraryContext'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { Grid } from '../components/Grid'
import { Slider } from '../components/Slider'

import '../styles/LibraryPage.scss'

export const LibraryPage = () => {
   const history = useHistory()
   const { loading, request } = useHttp()
   const { signOut, token } = useContext(AuthContext)
   const { animate, setActivePicture, activePicture } = useContext(LibraryContext)
   const [pictures, setPictures] = useState([])
   const [isEdit, setIsEdit] = useState(false)

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

      return () => {
         controller.abort()
         setIsEdit(false)
      }
      //if i put controller in dep, it will loop forever
      // eslint-disable-next-line react-hooks/exhaustive-deps  
   }, [getData])

   function changePictures(index, name, remove = false) {
      const clonePictures = pictures
      remove ? clonePictures.splice(index, 1) : clonePictures[index].name = name
      setPictures([...clonePictures])
   }

   async function editHandler() {
      if (isEdit) {
         try {
            const data = await request('/library', 'PATCH', [...pictures], {
               Authorization: `Bearez ${token}`
            })
            toast.success(data.message)
         } catch (e) {
            toast.error(e.message)
         } finally {
            setIsEdit(false)
         }
      } else {
         setIsEdit(true)
      }
   }

   function sliderBtnsHandler(bool, active = null) {
      if (bool && !isEdit) {
         setActivePicture(active)
         history.push(`/library/${pictures[active]._id}`)
      } else if (!bool) {
         setActivePicture(null)
         history.push('/library')
      }
   }

   const cls = ['library']
   if (animate) {
      cls.push('exit-animation')
   }

   return (
      <div className='container'>
         <Route path='/library/:id'>
            <Slider
               pictures={pictures}
               sliderBtnsHandler={sliderBtnsHandler}
            />
         </Route>

         {!loading
            ? <>
               <div className={cls.join(' ')}>
                  {pictures && pictures.map((picture, index) => (
                     <Grid
                        key={index}
                        index={index}
                        isEdit={isEdit}
                        picture={picture}
                        changePictures={changePictures}
                        sliderBtnsHandler={sliderBtnsHandler}
                     />
                  ))}
               </div>
               {pictures[0] && !activePicture && !animate && <div className='library__edit' onClick={editHandler}>
                  {!isEdit
                     ? <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9337 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.638 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825V3.36825Z" fill="#fff" />
                     </svg>
                     : <svg width="25" height="25" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  }
               </div>}
            </>
            : <Loader />
         }
      </div>
   )
}