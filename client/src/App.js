import { ToastContainer } from 'react-toastify'
import { Switch, Route, Redirect } from 'react-router-dom'

import { AuthPage } from './pages/AuthPage'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook';
import { PictureLibraryPage } from './pages/PictureLibraryPage';

import './styles/App.scss'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { signIn, signOut, token, userId } = useAuth()
  return (
    <>
      <AuthContext.Provider value={{ signIn, signOut, token, userId }}>
        <div className='pages'>
          {!!token
            ? <Switch>
              <Route path='/picturelibrary'>
                <PictureLibraryPage />
              </Route>
              <Redirect to='/picturelibrary' />
            </Switch>

            : <Switch>
              <Route path='/auth' exact>
                <AuthPage />
              </Route>
              <Redirect to='/auth' />
            </Switch>
          }
        </div>
      </AuthContext.Provider>

      <ToastContainer />
    </>
  )
}

export default App;
