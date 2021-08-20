import { useState } from 'react'
import '../styles/AddPicture.scss'

export const AddPicture = () => {
   const [input, setInput] = useState({ name: '', url: '' })

   function inputHandler(e) {
      setInput({ ...input, [e.target.name]: e.target.value })
   }

   return (
      <div className='container'>
         <div className='add-picture'>
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

               <button>add</button>
            </div>
         </div>
      </div >
   )
}