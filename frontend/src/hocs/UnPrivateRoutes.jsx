import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

const UnPrivateRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext)
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />
}

export default UnPrivateRoutes
