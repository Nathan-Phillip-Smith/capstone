import { useContext, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

const AdminPrivateRoutes = () => {
  const { isAuthenticated, user } = useContext(AuthContext)
  let isAdmin = false

  if (user.roles.includes('admin')) {
    isAdmin = true
  }

  return !isAuthenticated ? (
    <Navigate to="/login" />
  ) : !isAdmin ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  )
}

export default AdminPrivateRoutes
