import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseService from '../Services/CourseService'
import HomeHeader from './Header'
import HomeFooter from './Footer'

const CourseCreate = () => {
  const navigate = useNavigate()
  const [course, setCourse] = useState({
    courseId: '',
    courseTitle: '',
    courseDesc: '',
    roomNum: '',
    capacity: '',
    credits: '',
    tuition: '',
  })
  const [message, setMessage] = useState(null)
  let timerID = useRef(null)

  useEffect(() => {
    return () => {
      clearTimeout(timerID)
    }
  }, [])

  const handleInput = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setCourse({
      courseId: '',
      courseTitle: '',
      courseDesc: '',
      roomNum: '',
      capacity: '',
      credits: '',
      tuition: '',
    })
  }

  const onRegisterCourseClicked = async (e) => {
    e.preventDefault()
    const data = await CourseService.createCourse(course)
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
        <form className="form" onSubmit={onRegisterCourseClicked}>
          <div className="form__title-row">
            <h2>Create Course </h2>
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
              value={course.courseId}
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
              value={course.courseTitle}
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
              autoComplete="off"
              value={course.courseDesc}
              onChange={handleInput}
            />
          </div>

          <div className="form__element">
            <label className="form__label" htmlFor="roomNum">
              Room Number:
            </label>
            <input
              className={`form__input`}
              id="roomNum"
              name="roomNum"
              type="text"
              autoComplete="off"
              value={course.roomNum}
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
              value={course.capacity}
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
              value={course.credits}
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
              value={course.tuition}
              onChange={handleInput}
            />
          </div>
          <p className={message?.msgError ? 'messageError' : 'message '}>
            {message?.msgBody}
          </p>
          <div className="form__element">
            <button className="home-header__button" title="Register">
              Create Course
            </button>
          </div>
        </form>
      </section>
      <HomeFooter />
    </>
  )
  return content
}
export default CourseCreate
