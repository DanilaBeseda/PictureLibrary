import { Link, NavLink } from "react-router-dom"

import '../styles/Navbar.scss'

export const Navbar = () => {

   return (
      <div className='navbar'>
         <div className='navbar__container'>
            <div className='navbar__row'>
               <div className='navbar__logo'>
                  <span>Picture Library</span>
               </div>
               <div className='navbar__links'>
                  <NavLink to='/library' activeStyle={{ color: '#fff' }}>library</NavLink>
                  <NavLink to='/addpicture' activeStyle={{ color: '#fff' }}>add picture</NavLink>
                  <NavLink to='/signout' activeStyle={{ color: '#fff' }}>sign out</NavLink>
               </div>
            </div>
         </div>
      </div>
   )
}