import React, { createContext, useState, useEffect } from 'react'
import AuthService from '../Services/AuthService'

export const AuthContext = createContext()

export default ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await AuthService.isAuthenticated()
      setUser(data.user)
      setIsAuthenticated(data.isAuthenticated)
      setIsLoaded(true)
    }
    fetchData()
  }, [])

  return (
    <div>
      {!isLoaded ? (
        <h1>Loading</h1>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  )
}
