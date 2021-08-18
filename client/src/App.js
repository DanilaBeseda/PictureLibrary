import { ToastContainer } from 'react-toastify'

import { AuthPage } from './pages/AuthPage'

import './styles/App.scss'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <div className='pages'>
        <AuthPage />
      </div>
    </>
  )
}

export default App;
