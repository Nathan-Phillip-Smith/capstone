import { useContext, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthService from '../Services/AuthService'
import { AuthContext } from '../Context/AuthContext'
import HomeFooter from './Footer'
import HomeHeader from './Header'

const Login = () => {
  const authContext = useContext(AuthContext)
  const [user, setUser] = useState({ username: '', password: '' })
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await AuthService.login(user)
    if (data.isAuthenticated) {
      authContext.setUser(data.user)
      authContext.setIsAuthenticated(data.isAuthenticated)
      data.user.roles.includes('admin')
        ? navigate('/admin-panel')
        : navigate('/student-profile')
    } else {
      console.log(data.message)
      setMessage(data.message)
    }
  }

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const content = (
    <>
      <HomeHeader />
      <section className="student-login">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__title-row">
            <h2>Login </h2>
          </div>
          <div className="form__element">
            <label className="form__label" htmlFor="username">
              Username:
            </label>
            <input
              className="form__input"
              type="text"
              name="username"
              value={user.username}
              onChange={handleInput}
              autoComplete="off"
              required
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="password">
              Password:
            </label>
            <input
              className="form__input"
              type="password"
              name="password"
              onChange={handleInput}
              value={user.password}
              required
            />
          </div>
          <p className={message?.msgError ? 'messageError' : 'message '}>
            {message?.msgBody}
          </p>
          <div className="form__element">
            <button className="home-header__button">Sign In</button>
          </div>
        </form>
      </section>
      <HomeFooter />
    </>
  )
  return content
}
export default Login
