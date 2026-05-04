
import { ToastContainer } from 'react-toastify'
import './App.css'
import AppRoutes from './core/routes/AppRoutes'

function App() {

  return (
    <>
      <div className="limitsHeightToastContainer">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </div>

      <div className='app'>
        <AppRoutes />
      </div>
    </>
  )
}

export default App
