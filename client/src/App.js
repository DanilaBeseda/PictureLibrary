import { ToastContainer } from 'react-toastify'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { AuthPage } from './pages/AuthPage'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook';
import { PictureLibraryPages } from './pages/PictureLibraryPages';

import './styles/App.scss'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { signIn, signOut, token, userId } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [setIsLoaded])

  return (
    <>
      <AuthContext.Provider value={{ signIn, signOut, token, userId }}>
        {isLoaded && <div className='pages'>

          {!!token
            ? <PictureLibraryPages />
            : <Switch>
              <Route path='/auth' exact>
                <AuthPage />
              </Route>
              <Redirect to='/auth' />
            </Switch>
          }

        </div>}
      </AuthContext.Provider>

      <ToastContainer />
    </>
  )
}

export default App;
