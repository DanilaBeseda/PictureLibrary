import { Link, NavLink } from "react-router-dom"

import '../styles/Navbar.scss'

export const Navbar = () => {

   return (
      <div className='navbar'>
         <div className='navbar__container'>
            <div className='navbar__row'>
               <div className='navbar__logo'>
                  <Link to='/picturelibrary'>Picture Library</Link>
               </div>
               <div className='navbar__links'>
                  <NavLink to='/picturelibrary/library' activeStyle={{ color: '#fff' }}>library</NavLink>
                  <NavLink to='/picturelibrary/addpicture' activeStyle={{ color: '#fff' }}>add picture</NavLink>
                  <NavLink to='/picturelibrary/signout' activeStyle={{ color: '#fff' }}>sign out</NavLink>
               </div>
            </div>
         </div>
      </div>
   )
}