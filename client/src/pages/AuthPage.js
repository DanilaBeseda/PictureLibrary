import { useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import '../styles/AuthPage.scss'

export const AuthPage = () => {
   const [toggle, setToggle] = useState(false)

   return (
      <div className='auth'>
         <div className='auth__window'>
            <div className='auth__container'>
               <ul className='auth__list'>
                  <li
                     className={!toggle ? 'auth__item active' : 'auth__item'}
                     onClick={() => setToggle(false)}>sign in
                  </li>
                  <li
                     className={toggle ? 'auth__item active' : 'auth__item'}
                     onClick={() => setToggle(true)}>sign up
                  </li>
               </ul>
               <div className='auth__row'>
                  <SwitchTransition>
                     <CSSTransition
                        key={!toggle ? 'sign-in' : 'sign-up'}
                        timeout={300}
                        classNames='toggle'
                     >
                        {!toggle
                           ? <div className='sign-in'>
                              <label className='sign-in__email-label' htmlFor='email-for-sign-in'>email</label>
                              <input type='email' className='email-input' id='email-for-sign-in' />

                              <label className='sign-in__password-label' htmlFor='password-for-sign-in'>password</label>
                              <input type='password' className='password-input' id='password-for-sign-in' />

                              <div className='sign-in__row'>
                                 <input className='sign-in__checkbox' type='checkbox' id='checkbox' />
                                 <label htmlFor='checkbox'><span>keep me signed in</span></label>
                              </div>

                              <button>sign in</button>
                           </div>

                           : <div className='sign-up'>
                              <label className='sign-up__email-label' htmlFor='email-for-sign-up'>email</label>
                              <input type='email' className='email-input' id='email-for-sign-up' />

                              <label className='sign-up__password-label' htmlFor='password-for-sign-up'>password</label>
                              <input type='password' className='password-input' id='password-for-sign-up' />

                              <label className='sign-up__confirm-label' htmlFor='confirm-for-sign-up'>confirm password</label>
                              <input type='password' className='confirm-input' id='confirm-for-sign-up' />

                              <button>sign up</button>
                           </div>}
                     </CSSTransition>
                  </SwitchTransition>
               </div>

               {/* <div className='auth__sign-up'>
                  <button>sign up</button>
               </div> */}
            </div>
         </div>
      </div>
   )
}