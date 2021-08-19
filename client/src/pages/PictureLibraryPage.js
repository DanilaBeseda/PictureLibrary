import { Route, Switch } from "react-router-dom"

import { Library } from "../components/Library"
import { Navbar } from "../components/Navbar"
import { AddPicture } from "../components/AddPicture"
import { SignOut } from "../components/SignOut"

import '../styles/PictureLibraryPage.scss'

export const PictureLibraryPage = () => {
   return (
      <div className='library-page'>
         <Navbar />
         <div>
            <Switch>
               <Route path='/picturelibrary/library' exact>
                  <Library />
               </Route>
               <Route path='/picturelibrary/addpicture' exact>
                  <AddPicture />
               </Route>
               <Route path='/picturelibrary/signout' exact>
                  <SignOut />
               </Route>
            </Switch>
         </div>
      </div>
   )
}