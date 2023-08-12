import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseService from '../Services/CourseService'
import HomeHeader from './Header'
import HomeFooter from './Footer'

const CourseEdit = () => {
  const navigate = useNavigate()
  const [editedCourse, setEditedCourse] = useState({
    courseId: '',
    courseTitle: '',
    courseDesc: '',
    roomNum: '',
    capacity: 0,
    credits: 0,
    tuition: 0,
  })
  const [message, setMessage] = useState(null)
  let timerID = useRef(null)

  useEffect(() => {
    const fetchCourse = async () => {
      const courseToEdit = localStorage.getItem('courseToEdit')
      const data = await CourseService.getCourse({ id: courseToEdit })
      if (data?.message.msgError) {
        setMessage(data.message)
      } else {
        setEditedCourse({
          _id: courseToEdit,
          courseId: data.course['Course ID'],
          courseTitle: data.course['Course Title'],
          courseDesc: data.course['Course Description'],
          roomNum: data.course['Classroom Number'],
          capacity: data.course.Capacity,
          credits: data.course['Credit Hours'],
          tuition: data.course['Tuition Cost'],
        })
      }
    }
    fetchCourse()
  }, [])

  useEffect(() => {
    return () => {
      clearTimeout(timerID)
    }
  }, [])

  const handleInput = (e) => {
    setEditedCourse({ ...editedCourse, [e.target.name]: e.target.value })
  }

  const onEditCourseClicked = async (e) => {
    e.preventDefault()
    const data = await CourseService.editCourse(editedCourse)
    const { message } = data
    setMessage(message)
    if (!message.msgError) {
      localStorage.removeItem('courseToEdit')
      timerID = setTimeout(() => {
        navigate('/admin-panel')
      }, 2000)
    }
  }

  const content = (
    <>
      <HomeHeader />
      <section className="registration">
        <form className="form" onSubmit={onEditCourseClicked}>
          <div className="form__title-row">
            <h2>Edit Course Info </h2>
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="courseId">
              Course ID:
            </label>
            <input
              className={`form__input`}
              id="courseId"
              name="courseId"
              type="text"
              autoComplete="off"
              value={editedCourse.courseId}
              onChange={handleInput}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="courseTitle">
              Course Title:
            </label>
            <input
              className={`form__input`}
              id="courseTitle"
              name="courseTitle"
              type="text"
              autoComplete="off"
              value={editedCourse.courseTitle}
              onChange={handleInput}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="courseDesc">
              Course Description:
            </label>
            <textarea
              className={`form__input`}
              id="courseDesc"
              name="courseDesc"
              type="text"
              rows="7"
              autoComplete="off"
              value={editedCourse.courseDesc}
              onChange={handleInput}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="capacity">
              Capacity:
            </label>
            <input
              className={`form__input`}
              id="capacity"
              name="capacity"
              type="number"
              autoComplete="off"
              value={editedCourse.capacity}
              onChange={handleInput}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="credits">
              Credit Hours:
            </label>
            <input
              className={`form__input`}
              id="credits"
              name="credits"
              type="number"
              autoComplete="off"
              value={editedCourse.credits}
              onChange={handleInput}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="tuition">
              Tuition Cost:
            </label>
            <input
              className={`form__input`}
              id="tuition"
              name="tuition"
              type="number"
              autoComplete="off"
              value={editedCourse.tuition}
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
export default CourseEdit
