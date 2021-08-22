import { useContext } from 'react'

import { AuthContext } from '../context/AuthContext'
import { LibraryContext } from '../context/LibraryContext'

import '../styles/SignOutPage.scss'

export const SignOutPage = () => {
   const { signOut } = useContext(AuthContext)
   const { animate } = useContext(LibraryContext)

   const cls = ['sign-out']
   if (animate) {
      cls.push('exit-animation')
   }

   return (
      <div className='container'>
         <div className={cls.join(' ')}>
            <div className='sign-out__window'>
               <p>Do you really want to sign out?</p>
               <button onClick={() => signOut()}>Yes</button>
            </div>
         </div>
      </div>
   )
}