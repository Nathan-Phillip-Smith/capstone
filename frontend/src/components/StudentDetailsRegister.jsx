import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../Services/AuthService'
import HomeHeader from './Header'
import HomeFooter from './Footer'

const StudentDetailsRegister = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    username: '',
    password: '',
    isAdmin: false,
  })
  const [message, setMessage] = useState(null)
  let timerID = useRef(null)

  useEffect(() => {
    return () => {
      clearTimeout(timerID)
    }
  }, [])

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      username: '',
      password: '',
      isAdmin: false,
    })
  }

  const onRegisterUserClicked = async (e) => {
    e.preventDefault()
    const data = await AuthService.register(user)
    const { message } = data
    setMessage(message)
    if (!message.msgError) {
      resetForm()
      timerID = setTimeout(() => {
        navigate('/admin-panel')
      }, 2000)
    }
  }

  const content = (
    <>
      <HomeHeader />
      <section className="registration">
        <form className="form" onSubmit={onRegisterUserClicked}>
          <div className="form__title-row">
            <h2>Student Registration </h2>
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="firstName">
              First Name:
            </label>
            <input
              className={`form__input`}
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="off"
              value={user.firstName}
              onChange={handleInput}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="lastName">
              Last Name:
            </label>
            <input
              className={`form__input`}
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="off"
              value={user.lastName}
              onChange={handleInput}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="email">
              Email:
            </label>
            <input
              className={`form__input`}
              id="email"
              name="email"
              type="text"
              autoComplete="off"
              value={user.email}
              onChange={handleInput}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="phone">
              Phone:
            </label>
            <input
              className={`form__input`}
              id="phone"
              name="phone"
              type="text"
              autoComplete="off"
              value={user.phone}
              onChange={handleInput}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="address">
              Address:
            </label>
            <input
              className={`form__input`}
              id="address"
              name="address"
              type="text"
              autoComplete="off"
              value={user.address}
              onChange={handleInput}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="username">
              Username: <span className="nowrap">[3-20 letters]</span>
            </label>
            <input
              className={`form__input`}
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              value={user.username}
              onChange={handleInput}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="password">
              Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
            </label>
            <input
              className={`form__input`}
              id="password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleInput}
            />
          </div>
          <div className="form__element">
            <label className="form__label" htmlFor="isAdmin">
              Is Admin:
            </label>
            <input
              className={`form__input`}
              id="isAdmin"
              name="isAdmin"
              type="checkbox"
              value={user.isAdmin}
              onChange={handleInput}
            />
          </div>
          <p className={message?.msgError ? 'messageError' : 'message '}>
            {message?.msgBody}
          </p>
          <div className="form__element">
            <button className="home-header__button" title="Register">
              Register
            </button>
          </div>
        </form>
      </section>
      <HomeFooter />
    </>
  )
  return content
}
export default StudentDetailsRegister
