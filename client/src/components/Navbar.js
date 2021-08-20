import { NavLink } from "react-router-dom"

import '../styles/Navbar.scss'

export const Navbar = () => {

   return (
      <div className='navbar'>
         <div className='container'>
            <div className='navbar__row'>
               <div className='navbar__logo'>
                  <span>Picture Library</span>
               </div>
               <div className='navbar__links'>
                  <NavLink to='/library' activeClassName="selected">library</NavLink>
                  <NavLink to='/addpicture' activeClassName="selected" >add picture</NavLink>
                  <NavLink to='/signout' activeClassName="selected" >sign out</NavLink>
               </div>
            </div>
         </div>
      </div>
   )
}