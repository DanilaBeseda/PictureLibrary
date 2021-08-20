import { Redirect, Route, Switch } from "react-router-dom"

import { Library } from "../components/Library"
import { Navbar } from "../components/Navbar"
import { AddPicture } from "../components/AddPicture"
import { SignOut } from "../components/SignOut"

import '../styles/PictureLibraryPage.scss'

export const PictureLibraryPage = () => {
   return (
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
   )
}