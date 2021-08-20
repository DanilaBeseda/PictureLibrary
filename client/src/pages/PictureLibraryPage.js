import { Redirect, Route, Switch } from "react-router-dom"

import { Library } from "../components/Library"
import { Navbar } from "../components/Navbar"
import { AddPicture } from "../components/AddPicture"
import { SignOut } from "../components/SignOut"
import { useAnimation } from "../hooks/animation.hook"
import { LibraryContext } from '../context/LibraryContext'

import '../styles/PictureLibraryPage.scss'


export const PictureLibraryPage = () => {
   const { animate, setAnimation, timeout } = useAnimation()

   return (
      <LibraryContext.Provider value={{ animate, setAnimation, timeout }}>

         <div className='library-page'>
            <Navbar />

            <Switch>
               <Route path='/library' exact>
                  <Library />
               </Route>
               <Route path='/addpicture' exact>
                  <AddPicture />
               </Route>
               <Route path='/signout' exact>
                  <SignOut />
               </Route>
               <Redirect to='/library' />
            </Switch>
         </div>

      </LibraryContext.Provider>
   )
}