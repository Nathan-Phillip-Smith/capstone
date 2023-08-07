import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import HomeFooter from '../../components/HomeFooter'
import HomeHeader from '../../components/HomeHeader'

const StudentLogin = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()

  // const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/dash')
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response')
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg(err.data?.message)
      }
      errRef.current.focus()
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  // const handleToggle = () => setPersist((prev) => !prev)

  const errClass = errMsg ? 'errmsg' : 'offscreen'

  // if (isLoading) return <p>Loading...</p>

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
          {/* <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust This Device
          </label> */}
        </form>
      </section>
      <HomeFooter />
    </>
  )
  return content
}
export default StudentLogin

// import { useDispatch } from 'react-redux'
// import { setCredentials } from './authSlice'
// import { useLoginMutation } from './authApiSlice'

// import usePersist from '../../hooks/usePersist'

// const [persist, setPersist] = usePersist()

// const dispatch = useDispatch()
