import { useContext } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { LibraryContext } from "../context/LibraryContext"

import '../styles/Navbar.scss'

export const Navbar = () => {
   const routes = [
      { path: '/library', name: 'library' },
      { path: '/addpicture', name: 'add picture' },
      { path: '/signout', name: 'signout' }
   ]

   const { setAnimation, timeout } = useContext(LibraryContext)
   const history = useHistory()
   const locPath = history.location.pathname

   function linkHandler(e, path) {     //need for animation
      if (locPath === path) return

      e.preventDefault()
      setAnimation()
      setTimeout(() => {
         history.push(path)
      }, timeout)
   }

   return (
      <div className='navbar'>
         <div className='container'>
            <div className='navbar__row'>
               <div className='navbar__logo'>
                  <span>Picture Library</span>
               </div>
               <div className='navbar__links'>
                  {routes.map(({ path, name }) => (
                     <NavLink
                        key={name}
                        to={path}
                        activeClassName="selected"
                        onClick={(e) => linkHandler(e, path)}
                     >
                        {name}
                     </NavLink>
                  ))}
               </div>
            </div>
         </div>
      </div >
   )
}