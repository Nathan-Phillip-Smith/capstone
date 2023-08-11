import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../Services/AuthService'
import HomeHeader from './Header'
import HomeFooter from './Footer'

// const USER_REGEX = /^[A-z]{3,20}$/
// const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
// const FNAME_REGEX = /^[A-z]{1,20}$/
// const LNAME_REGEX = /^[A-z]{1,20}$/
// const EMAIL_REGEX = /^[A-z0-9!@#$%.-_]{7,50}$/
// const PHONE_REGEX = /^[0-9()-\s]{7,12}$/
// const ADD_REGEX = /^[A-z0-9!@#$%'()-_"\s]{1,200}$/

const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    username: '',
    password: '',
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
    })
  }

  // const canRegister = [
  //   FNAME_REGEX.test(user.firstName),
  //   LNAME_REGEX.test(user.lastName),
  //   EMAIL_REGEX.test(user.email),
  //   PHONE_REGEX.test(user.phone),
  //   ADD_REGEX.test(user.address),
  //   USER_REGEX.test(user.username),
  //   PWD_REGEX.test(user.password),
  // ].every(Boolean)

  const onRegisterUserClicked = async (e) => {
    e.preventDefault()
    const data = await AuthService.register(user)
    const { message } = data
    setMessage(message)
    if (!message.msgError) {
      resetForm()
      timerID = setTimeout(() => {
        navigate('/login')
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
export default Register
