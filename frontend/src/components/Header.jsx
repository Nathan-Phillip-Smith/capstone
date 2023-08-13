import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import AuthService from '../Services/AuthService'

const HomeHeader = () => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const onRegisterClicked = () => {
    localStorage.removeItem('courseToEdit')
    localStorage.removeItem('studentToEdit')
    navigate('/register')
  }
  const onLoginClicked = () => {
    localStorage.removeItem('courseToEdit')
    localStorage.removeItem('studentToEdit')
    navigate('/login')
  }
  const onProfileClicked = () => {
    localStorage.removeItem('courseToEdit')
    localStorage.removeItem('studentToEdit')
    navigate('/student-profile')
  }
  const onAdminPanelClicked = () => {
    localStorage.removeItem('courseToEdit')
    localStorage.removeItem('studentToEdit')
    navigate('/admin-panel')
  }
  const onHomeClicked = () => {
    localStorage.removeItem('courseToEdit')
    localStorage.removeItem('studentToEdit')
    navigate('/')
  }
  const onLogoutClicked = async () => {
    localStorage.removeItem('courseToEdit')
    localStorage.removeItem('studentToEdit')
    const data = await AuthService.logout()
    if (data.success) {
      setUser(data.user)
      setIsAuthenticated(false)
      navigate('/login')
    }
  }

  const unauthenticatedButtons = () => {
    return (
      <>
        <button
          className={
            pathname === '/' ? 'home-header__button-alt' : 'home-header__button'
          }
          title="Home"
          onClick={onHomeClicked}
        >
          Home
        </button>
        <button
          className={
            pathname === '/register'
              ? 'home-header__button-alt'
              : 'home-header__button'
          }
          title="Register"
          onClick={onRegisterClicked}
        >
          Register
        </button>
        <button
          className={
            pathname === '/login'
              ? 'home-header__button-alt'
              : 'home-header__button'
          }
          title="Login"
          onClick={onLoginClicked}
        >
          Login
        </button>
      </>
    )
  }

  const authenticatedButtons = () => {
    return (
      <>
        <button
          className={
            pathname === '/' ? 'home-header__button-alt' : 'home-header__button'
          }
          title="Home"
          onClick={onHomeClicked}
        >
          Home
        </button>
        {user.roles.includes('admin') ? (
          <button
            className={
              pathname === '/admin-panel'
                ? 'home-header__button-alt'
                : 'home-header__button'
            }
            title="AdminPanel"
            onClick={onAdminPanelClicked}
          >
            Admin Panel
          </button>
        ) : (
          <button
            className={
              pathname === '/student-profile'
                ? 'home-header__button-alt'
                : 'home-header__button'
            }
            title="Profile"
            onClick={onProfileClicked}
          >
            Profile
          </button>
        )}

        <button
          className="home-header__button"
          title="Logout"
          onClick={onLogoutClicked}
        >
          Logout
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
        <nav className="home-header__nav">
          {!isAuthenticated ? unauthenticatedButtons() : authenticatedButtons()}
        </nav>
      </header>
      <section className="home__banner-header"></section>
    </>
  )

  return content
}
export default HomeHeader
