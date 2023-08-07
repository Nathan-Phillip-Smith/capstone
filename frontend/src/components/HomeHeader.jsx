import { Link, useLocation, useNavigate } from 'react-router-dom'

const HomeHeader = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const onRegisterClicked = () => navigate('/register')
  const onStudentLoginClicked = () => navigate('/student-login')
  const onAdminLoginClicked = () => navigate('/admin-login')
  const onHomeClicked = () => navigate('/')

  let buttons = null
  if (pathname === '/') {
    buttons = (
      <>
        <button
          className="home-header__button-alt"
          title="Register"
          onClick={onRegisterClicked}
        >
          Register
        </button>
        <button
          className="home-header__button"
          title="StudentLogin"
          onClick={onStudentLoginClicked}
        >
          Student Login
        </button>
        <button
          className="home-header__button"
          title="AdminLogin"
          onClick={onAdminLoginClicked}
        >
          Admin Login
        </button>
      </>
    )
  } else if (pathname === '/student-login') {
    buttons = (
      <>
        <button
          className="home-header__button-alt"
          title="Home"
          onClick={onHomeClicked}
        >
          Home
        </button>
        <button
          className="home-header__button"
          title="Register"
          onClick={onRegisterClicked}
        >
          Register
        </button>
      </>
    )
  } else if (pathname === '/register') {
    buttons = (
      <>
        <button
          className="home-header__button-alt"
          title="Home"
          onClick={onHomeClicked}
        >
          Home
        </button>
        <button
          className="home-header__button"
          title="StudentLogin"
          onClick={onStudentLoginClicked}
        >
          Student Login
        </button>
      </>
    )
  } else {
    buttons = (
      <>
        <button
          className="home-header__button-alt"
          title="Home"
          onClick={onHomeClicked}
        >
          Home
        </button>
      </>
    )
  }

  const content = (
    <>
      <header className="home-header">
        <div className="home-header__container">
          <Link to="/">
            <p className="home-header__logo">CPU</p>
          </Link>
          <Link to="/">
            <p className="home-header__title">Capstone Project University</p>
          </Link>
        </div>
        <nav className="home-header__nav">{buttons}</nav>
      </header>
      <section className="home__banner-header"></section>
    </>
  )

  return content
}
export default HomeHeader
