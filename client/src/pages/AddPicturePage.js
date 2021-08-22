import { useContext, useState } from 'react'
import { toast } from 'react-toastify'

import { LibraryContext } from '../context/LibraryContext'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

import '../styles/AddPicturePage.scss'

export const AddPicturePage = () => {
   const { animate } = useContext(LibraryContext)
   const { token, signOut } = useContext(AuthContext)
   const { loading, request } = useHttp()
   const [input, setInput] = useState({ name: '', url: '' })

   const cls = ['add-picture']
   if (animate) {
      cls.push('exit-animation')
   }

   function inputHandler(e) {
      setInput({ ...input, [e.target.name]: e.target.value })
   }

   async function addBtnHandler() {
      try {
         const data = await request('/addpicture', 'POST', { ...input }, {
            Authorization: `Bearer ${token}`
         })
         toast.success(data.message)
      } catch (e) {
         toast.error(e.message)
         if (e.message === 'jwt expired') {
            signOut()
         }
      }
   }

   return (
      <div className='container'>
         <div className={cls.join(' ')}>
            <div className='add-picture__form'>
               <h2>Add your picture</h2>
               <div>
                  <input
                     type='text'
                     id='pictureName'
                     name='name'
                     onChange={inputHandler}
                     value={input.name}
                     required
                  />
                  <label htmlFor='pictureName'>picture name</label>
               </div>

               <div>
                  <input
                     type='text'
                     id='url'
                     name='url'
                     onChange={inputHandler}
                     value={input.url}
                     required
                  />
                  <label htmlFor='url'>url</label>
               </div>

               <button onClick={addBtnHandler} disabled={loading}>add</button>
            </div>
         </div>
      </div >
   )
}