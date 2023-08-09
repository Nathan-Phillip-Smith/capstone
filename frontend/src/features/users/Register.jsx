import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import HomeHeader from '../../components/HomeHeader'
import HomeFooter from '../../components/HomeFooter'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const FNAME_REGEX = /^[A-z]{1,20}$/
const LNAME_REGEX = /^[A-z]{1,20}$/
const EMAIL_REGEX = /^[A-z0-9!@#$%.-_]{7,50}$/
const PHONE_REGEX = /^[0-9()-\s]{7,12}$/
const ADD_REGEX = /^[A-z0-9!@#$%'()-_"\s]{1,200}$/

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [validFirstName, setValidFirstName] = useState(false)
  const [lastName, setLastName] = useState('')
  const [validLastName, setValidLastName] = useState(false)
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [phone, setPhone] = useState('')
  const [validPhone, setValidPhone] = useState(false)
  const [address, setAddress] = useState('')
  const [validAddress, setValidAddress] = useState(false)
  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setValidFirstName(FNAME_REGEX.test(firstName))
  }, [firstName])

  useEffect(() => {
    setValidLastName(LNAME_REGEX.test(lastName))
  }, [lastName])
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone))
  }, [phone])
  useEffect(() => {
    setValidAddress(ADD_REGEX.test(address))
  }, [address])
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])
  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  const onFirstNameChanged = (e) => setFirstName(e.target.value)
  const onLastNameChanged = (e) => setLastName(e.target.value)
  const onEmailChanged = (e) => setEmail(e.target.value)
  const onPhoneChanged = (e) => setPhone(e.target.value)
  const onAddressChanged = (e) => setAddress(e.target.value)
  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)

  const canRegister = [
    validFirstName,
    validLastName,
    validEmail,
    validPhone,
    validAddress,
    validUsername,
    validPassword,
  ].every(Boolean)

  const onRegisterUserClicked = async (e) => {
    e.preventDefault()
    const userObject = {
      firstName,
      lastName,
      email,
      phone,
      address,
      username,
      password,
    }
    if (canRegister) {
      axios
        .post('http://localhost:3500/users/register', userObject)
        .then((user) => {
          console.log(user)
          setFirstName('')
          setLastName('')
          setEmail('')
          setPhone('')
          setAddress('')
          setUsername('')
          setPassword('')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const errClass = isError ? 'errmsg' : 'offscreen'
  const validUserClass = !validUsername ? 'form__input--incomplete' : ''
  const validPwdClass = !validPassword ? 'form__input--incomplete' : ''

  const content = (
    <>
      <HomeHeader />
      <section className="registration">
        {<p className={errClass}>All Fields Required</p>}
        <form className="form" onSubmit={onRegisterUserClicked}>
          <div className="form__title-row">
            <h2>Student Registration </h2>
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="firstName">
              First Name:
            </label>
            <input
              className={`form__input ${validUserClass}`}
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="off"
              value={firstName}
              onChange={onFirstNameChanged}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="lastName">
              Last Name:
            </label>
            <input
              className={`form__input ${validUserClass}`}
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="off"
              value={lastName}
              onChange={onLastNameChanged}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="email">
              Email:
            </label>
            <input
              className={`form__input ${validUserClass}`}
              id="email"
              name="email"
              type="text"
              autoComplete="off"
              value={email}
              onChange={onEmailChanged}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="phone">
              Phone:
            </label>
            <input
              className={`form__input ${validUserClass}`}
              id="phone"
              name="phone"
              type="text"
              autoComplete="off"
              value={phone}
              onChange={onPhoneChanged}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="address">
              Address:
            </label>
            <input
              className={`form__input ${validUserClass}`}
              id="address"
              name="address"
              type="text"
              autoComplete="off"
              value={address}
              onChange={onAddressChanged}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="username">
              Username: <span className="nowrap">[3-20 letters]</span>
            </label>
            <input
              className={`form__input ${validUserClass}`}
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              value={username}
              onChange={onUsernameChanged}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="password">
              Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
            </label>
            <input
              className={`form__input ${validPwdClass}`}
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
            />
          </div>

          <div className="form__element">
            <button
              className="icon-button"
              title="Register"
              disabled={!canRegister}
            >
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
