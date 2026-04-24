
import { ToastContainer } from 'react-toastify'
import './App.css'
import AppRoutes from './core/routes/AppRoutes'

function App() {

  return (
    <>
      <ToastContainer />
      <div className='app'>
        <AppRoutes />
      </div>
    </>
  )
}

export default App
