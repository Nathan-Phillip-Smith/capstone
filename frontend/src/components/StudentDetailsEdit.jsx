import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import UserService from '../Services/UserService'
import HomeHeader from './Header'
import HomeFooter from './Footer'

const StudentDetailsEdit = () => {
  const navigate = useNavigate()
  const [editedUser, setEditedUser] = useState({
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
    const fetchUser = async () => {
      const studentFromStorage = await localStorage.getItem('studentToEdit')
      const data = await UserService.getUserFromId({ id: studentFromStorage })
      if (data?.message.msgError) {
        setMessage(data.message)
      } else if (!data?.message.msgError) {
        setEditedUser(data.user)
      } else {
        setMessage({ message: { msgBody: 'Try again later', msgError: true } })
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    return () => {
      clearTimeout(timerID)
    }
  }, [])

  const handleInput = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value })
  }

  const onEditUserClicked = async (e) => {
    e.preventDefault()
    const data = await UserService.editUser(editedUser)
    const { message } = data
    setMessage(message)
    if (!message.msgError) {
      timerID = setTimeout(() => {
        navigate('/admin-panel')
      }, 2000)
    }
  }

  const content = (
    <>
      <HomeHeader />
      <section className="registration">
        <form className="form" onSubmit={onEditUserClicked}>
          <div className="form__title-row">
            <h2>Edit Student Info </h2>
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
              value={editedUser.firstName}
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
              value={editedUser.lastName}
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
              value={editedUser.email}
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
              value={editedUser.phone}
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
              value={editedUser.address}
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
              value={editedUser.username}
              onChange={handleInput}
            />
          </div>

          <p className={message?.msgError ? 'messageError' : 'message '}>
            {message?.msgBody}
          </p>
          <div className="form__element">
            <button className="home-header__button" title="Register">
              Edit Info
            </button>
          </div>
        </form>
      </section>
      <HomeFooter />
    </>
  )
  return content
}
export default StudentDetailsEdit
