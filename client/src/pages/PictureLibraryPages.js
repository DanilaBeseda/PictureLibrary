import { Redirect, Route, Switch } from "react-router-dom"

import { LibraryPage } from "./LibraryPage"
import { Navbar } from "../components/Navbar"
import { AddPicturePage } from "./AddPicturePage"
import { SignOutPage } from "./SignOutPage"
import { useAnimation } from "../hooks/animation.hook"
import { LibraryContext } from '../context/LibraryContext'

import '../styles/PictureLibraryPages.scss'


export const PictureLibraryPages = () => {
   const { animate, setAnimation, timeout } = useAnimation()

   return (
      <LibraryContext.Provider value={{ animate, setAnimation, timeout }}>

         <div className='library-page'>
            <Navbar />

            <Switch>
               <Route path='/library' exact>
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

      </LibraryContext.Provider>
   )
}