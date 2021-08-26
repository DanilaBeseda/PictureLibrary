import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"

export const Grid = ({ index, isEdit, picture, changePictures, sliderBtnsHandler }) => {
   const { request, loading } = useHttp()
   const { token } = useContext(AuthContext)
   const [name, setName] = useState(picture.name)
   const [isСonfirmation, setIsConfirmation] = useState(false)

   useEffect(() => {
      changePictures(index, name)

      //if i put changePictures in dep, it will loop forever
      // eslint-disable-next-line react-hooks/exhaustive-deps 
   }, [name, index])

   async function confirmBtnHandler() {
      try {
         const data = await request(`/library/${picture._id}`, 'DELETE', null, {
            Authorization: `Bearez ${token}`
         })
         changePictures(index, null, true)
         toast.success(data.message)
      } catch (e) {
         toast.error(e.message)
      } finally {
         setIsConfirmation(false)
      }
   }

   return (
      <div className='library__item' onClick={() => sliderBtnsHandler(true, index)}>

         {!isEdit
            ? <span>{picture.name}</span>
            : <>{!isСonfirmation && <input type='text' value={picture.name} onChange={(e) => setName(e.target.value)} />}</>
         }
         <img src={picture.url} alt={picture.name} />

         {isEdit &&
            <>
               {!isСonfirmation
                  ? <button onClick={() => setIsConfirmation(true)}>
                     <svg enableBackground="new 0 0 510 510" height="25" viewBox="0 0 510 510" width="25" xmlns="http://www.w3.org/2000/svg" fill='#4043a5c4'><g>
                        <path d="m240 240h30v165h-30z" /><path d="m180 240h30v165h-30z" /><path d="m300 240h30v165h-30z" /><path d="m450 60h-120v-15c0-24.813-20.186-45-45-45h-60c-24.814 0-45 20.187-45 45v15h-120v90h31.248l27.584 317.243c1.191 24.007 20.863 42.757 44.944 42.757h182.447c24.081 0 43.753-18.75 44.944-42.757l27.585-317.243h31.248zm-240-15c0-8.271 6.729-15 15-15h60c8.272 0 15 6.729 15 15v15h-90zm-120 45h330v30h-330zm271.211 375.624c-.336 8.061-6.919 14.376-14.987 14.376h-182.448c-8.068 0-14.651-6.314-14.987-14.376-29.348-337.707-27.341-314.616-27.429-315.624h267.28c-.08.905 1.788-20.569-27.429 315.624z" /></g>
                     </svg>
                  </button>
                  : <div className='library__confirmation'>
                     <span>Are you really want to delete picture?</span>
                     <div className='row'>
                        <button onClick={confirmBtnHandler} disabled={loading}>Yes</button>
                        <button onClick={() => setIsConfirmation(false)} disabled={loading}>No</button>
                     </div>
                  </div>
               }
            </>
         }
      </div>
   )
}