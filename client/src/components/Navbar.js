import { NavLink } from "react-router-dom"

import '../styles/Navbar.scss'

export const Navbar = () => {
   const NavLinkStyles = {
      color: '#fff',
      boxShadow: '#fff 0px 0px 7px 0px'
   }

   return (
      <div className='navbar'>
         <div className='navbar__container'>
            <div className='navbar__row'>
               <div className='navbar__logo'>
                  <span>Picture Library</span>
               </div>
               <div className='navbar__links'>
                  <NavLink to='/library' activeStyle={NavLinkStyles}>library</NavLink>
                  <NavLink to='/addpicture' activeStyle={NavLinkStyles}>add picture</NavLink>
                  <NavLink to='/signout' activeStyle={NavLinkStyles}>sign out</NavLink>
               </div>
            </div>
         </div>
      </div>
   )
}