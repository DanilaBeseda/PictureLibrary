import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"

export const Grid = ({ index, isEdit, picture, changePictures }) => {
   const { request, loading } = useHttp()
   const { token } = useContext(AuthContext)
   const [name, setName] = useState(picture.name)
   const [isСonfirmation, setIsConfirmation] = useState(false)
   const [isSlider, setIsSlider] = useState(false)

   useEffect(() => {
      changePictures(index, name)

      //if i put changePictures in dep, it will loop forever
      // eslint-disable-next-line react-hooks/exhaustive-deps 
   }, [name, index])

   async function confirmBtnHandler() {
      const id = picture._id

      try {
         const data = await request(`/library/${id}`, 'DELETE', null, {
            Authorization: `Bearez ${token}`
         })
         changePictures(index, null, true)
         toast.success(data.message)
      } catch (e) {
         toast.error(e.message)
      }
   }

   const cls = ['library__item']

   if (!isEdit && isSlider && !cls.includes('slider')) {
      cls.push('slide')
   }

   function closeBtnHandler(e) {
      e.stopPropagation()
      setIsSlider(false)
   }

   return (
      <div className={cls.join(' ')} onClick={() => setIsSlider(true)}>
         {isSlider &&
            <button onClick={closeBtnHandler}>
               <svg width="22" height="22" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z" fill="#fff" />
               </svg>
            </button>
         }
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