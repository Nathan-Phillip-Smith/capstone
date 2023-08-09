import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import HomeFooter from '../../components/HomeFooter'
import HomeHeader from '../../components/HomeHeader'

const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()

  // const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:3500/users/login', { username, password })
      .then((user) => {
        console.log(user)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

  const errClass = errMsg ? 'errmsg' : 'offscreen'

  const content = (
    <>
      <HomeHeader />
      <section className="student-login">
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form__title-row">
            <h2>Student Login </h2>
          </div>
          <div className="form__element">
            <label className="form__label" htmlFor="username">
              Username:
            </label>
            <input
              className="form__input"
              type="text"
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
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
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
            />
          </div>

          <div className="form__element">
            <button className="form__submit-button">Sign In</button>
          </div>
        </form>
      </section>
      <HomeFooter />
    </>
  )
  return content
}
export default Login
