import { Redirect, Route, Switch } from "react-router-dom"

import { LibraryPage } from "./LibraryPage"
import { Navbar } from "../components/Navbar"
import { AddPicturePage } from "./AddPicturePage"
import { SignOutPage } from "./SignOutPage"
import { useAnimation } from "../hooks/animation.hook"
import { LibraryContext } from '../context/LibraryContext'
import { useState } from "react"

import '../styles/PictureLibraryPages.scss'

export const PictureLibraryPages = () => {
   const { animate, setAnimation, timeout } = useAnimation()
   const [activePicture, setActivePicture] = useState(null)
   const cls = ['library-pages']

   if (animate) {
      cls.push('of-hidden')
   }

   return (
      <LibraryContext.Provider value={{ animate, setAnimation, timeout, activePicture, setActivePicture }}>

         <div className='library-page'>
            <Navbar />
            <div className={cls.join(' ')}>
               <Switch>
                  <Route path='/library'>
                     <LibraryPage />
                  </Route>
                  <Route path='/addpicture' exact>
                     <AddPicturePage />
                  </Route>
                  <Route path='/signout' exact>
                     <SignOutPage />
                  </Route>
                  <Redirect to='/library' />
               </Switch>
            </div>
         </div>

      </LibraryContext.Provider>
   )
}