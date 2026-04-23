
import { Outlet } from 'react-router-dom'
import './App.css'
import AppRoutes from './core/routes/AppRoutes'

function App() {

  return (
      <div>
        <AppRoutes />
        <Outlet />
      </div>
  )
}

export default App
