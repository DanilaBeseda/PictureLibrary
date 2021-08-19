import { useState, useContext } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { toast } from 'react-toastify'

import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

import '../styles/AuthPage.scss'

export const AuthPage = () => {
   const { loading, request } = useHttp()
   const auth = useContext(AuthContext)

   const [toggle, setToggle] = useState(false)
   const [keepSignedIn, setKeepSignedIn] = useState(false)
   const [confirmPassword, setConfirmPassword] = useState('')
   const [form, setForm] = useState({ email: '', password: '' })

   function reset() {
      setKeepSignedIn(false)
      setConfirmPassword('')
      setForm({ email: '', password: '' })
   }

   function toggleHandler(bool) {
      reset()
      setToggle(bool)
   }

   function formHandler(e) {
      setForm({ ...form, [e.target.name]: e.target.value })
   }

   async function signIn() {
      try {
         const data = await request('/auth/signin', 'POST', { ...form })
         auth.signIn(data.token, data.userId)
      } catch (e) {
         toast.error(e.message)
      }
   }

   async function signUp() {
      if (form.password !== confirmPassword) {
         toast.error('Пароли не совпадают')
         return
      }

      try {
         const data = await request('/auth/signup', 'POST', { ...form })
         reset()
         setToggle(false)
         toast.success(data.message)
      } catch (e) {
         toast.error(e.message)
      }
   }

   return (
      <div className='auth'>
         <div className='auth__window'>
            <div className='auth__container'>
               <ul className='auth__list'>
                  <li
                     className={!toggle ? 'auth__item active' : 'auth__item'}
                     onClick={() => toggleHandler(false)}>sign in
                  </li>
                  <li
                     className={toggle ? 'auth__item active' : 'auth__item'}
                     onClick={() => toggleHandler(true)}>sign up
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
                              <input
                                 type='email'
                                 className='email-input'
                                 id='email-for-sign-in'
                                 name='email'
                                 onChange={formHandler}
                                 value={form.email}
                              />

                              <label className='sign-in__password-label' htmlFor='password-for-sign-in'>password</label>
                              <input
                                 type='password'
                                 className='password-input'
                                 id='password-for-sign-in'
                                 name='password'
                                 onChange={formHandler}
                                 value={form.password}
                              />

                              <div className='sign-in__row'>
                                 <input
                                    className='sign-in__checkbox'
                                    type='checkbox'
                                    id='checkbox'
                                    name='checkbox'
                                    onChange={() => setKeepSignedIn(prev => !prev)}
                                    checked={keepSignedIn}
                                    disabled={loading}
                                 />
                                 <label htmlFor='checkbox'><span>keep me signed in</span></label>
                              </div>

                              <button onClick={signIn} disabled={loading}>sign in</button>
                           </div>

                           : <div className='sign-up'>
                              <label className='sign-up__email-label' htmlFor='email-for-sign-up'>email</label>
                              <input
                                 type='email'
                                 className='email-input'
                                 id='email-for-sign-up'
                                 name='email'
                                 onChange={formHandler}
                                 value={form.email}
                              />

                              <label className='sign-up__password-label' htmlFor='password-for-sign-up'>password</label>
                              <input
                                 type='password'
                                 className='password-input'
                                 id='password-for-sign-up'
                                 name='password'
                                 onChange={formHandler}
                                 value={form.password}
                              />

                              <label className='sign-up__confirm-label' htmlFor='confirm-for-sign-up'>confirm password</label>
                              <input
                                 type='password'
                                 className='confirm-input'
                                 id='confirm-for-sign-up'
                                 onChange={(e) => setConfirmPassword(e.target.value)}
                                 value={confirmPassword}
                              />

                              <button onClick={signUp} disabled={loading}>sign up</button>
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