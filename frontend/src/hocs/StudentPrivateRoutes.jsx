import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

const StudentPrivateRoutes = () => {
  const { isAuthenticated, user } = useContext(AuthContext)
  let isStudent = true
  if (user.roles.includes('admin')) {
    isStudent = false
  }

  return !isAuthenticated ? (
    <Navigate to="/login" />
  ) : !isStudent ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  )
}

export default StudentPrivateRoutes
