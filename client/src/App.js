import { ToastContainer } from 'react-toastify'

import { AuthPage } from './pages/AuthPage'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook';

import './styles/App.scss'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { signIn, signOut, token, userId } = useAuth()

  return (
    <>
      <ToastContainer />
      <AuthContext.Provider value={signIn, signOut, token, userId}>
        <div className='pages'>
          <AuthPage />
        </div>
      </AuthContext.Provider>
    </>
  )
}

export default App;
