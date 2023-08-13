import HomeFooter from './Footer'
import HomeHeader from './Header'
import { useNavigate } from 'react-router-dom'
import CourseScheduleRow from './CourseScheduleRow'
import CourseAvailableRow from './CourseAvailableRow'
import { useEffect, useState } from 'react'
import CourseService from '../Services/CourseService'
import UserService from '../Services/UserService'

const StudentDetails = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    username: '',
    password: '',
    classes: [],
  })
  const [courses, setCourses] = useState([])
  const [availableCourses, setAvailableCourses] = useState([])
  const [schedule, setSchedule] = useState([])
  const [message, setMessage] = useState(null)
  const [search, setSearch] = useState({ courseId: '', courseTitle: '' })
  const [allMessage, setAllMessage] = useState(null)
  const [scheduleMessage, setScheduleMessage] = useState(null)
  const [credits, setCredits] = useState(0)
  const [tuition, setTuition] = useState(0)

  useEffect(() => {
    const fetchUser = async () => {
      const studentFromStorage = await localStorage.getItem('studentToEdit')
      const data = await UserService.getUserFromId({ id: studentFromStorage })
      if (data?.message.msgError) {
        setMessage(data.message)
      } else if (!data?.message.msgError) {
        setUser(data.user)
      } else {
        setMessage({ message: { msgBody: 'Try again later', msgError: true } })
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await CourseService.getCourses()
      if (data?.message) {
        setMessage(data.message)
      } else {
        setCourses(data)
      }
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    let scheduleArray = []
    courses.map((course) => {
      if (user?.classes?.includes(course._id)) {
        scheduleArray.push(course)
      }
      setSchedule(scheduleArray)
    })
  }, [courses])

  useEffect(() => {
    let creditStart = 0
    let tuitionStart = 0
    courses.map((course) => {
      if (user.classes.includes(course._id)) {
        creditStart += course['Credit Hours']
        tuitionStart += course['Tuition Cost']
      }
      setCredits(creditStart)
      setTuition(tuitionStart)
    })
  }, [schedule])

  useEffect(() => {
    let availableCoursesArray = [...courses]

    if (search.courseId.length > 0) {
      availableCoursesArray = courses.filter((course) =>
        course['Course ID']
          .toLowerCase()
          .includes(search.courseId.toLowerCase())
      )
    }
    if (search.courseTitle.length > 0) {
      availableCoursesArray = availableCoursesArray.filter((course) =>
        course['Course Title']
          .toLowerCase()
          .includes(search.courseTitle.toLowerCase())
      )
    }
    setAvailableCourses(availableCoursesArray)
  }, [courses, search])

  const onEditInfoClicked = () => navigate('/student-details-edit')

  const onAddClassClicked = async (e) => {
    let newClasses = []
    let newClassesId = []
    const data = await CourseService.addClass({
      id: e.target.id,
      credits: credits,
      userUsername: user.username,
    })
    if (!data.message.msgError) {
      courses.map((course) => {
        if (course._id === e.target.id) {
          newClasses = [...schedule]
          newClasses.push(course)
          newClassesId = [...user.classes]
          newClassesId.push(course._id)
        }
        if (course._id === data.updatedCourse._id) {
          course.Capacity = data.updatedCourse.Capacity
        }
      })
      setUser({ ...user, classes: newClassesId })
      setSchedule(newClasses)
    }
    setAllMessage(data.message)
  }

  const onRemoveClassClicked = async (e) => {
    let newClasses = []
    let newClassesId = []
    const data = await CourseService.removeClass({
      id: e.target.id,
      userUsername: user.username,
    })
    schedule.map((course) => {
      if (course._id === e.target.id) {
        newClasses = [...schedule]
        newClasses = newClasses.filter((item) => item._id !== course._id)
        newClassesId = [...user.classes]
        newClassesId = newClassesId.filter((item) => item !== course._id)
      }
      if (course._id === data.updatedCourse._id) {
        course.Capacity = data.updatedCourse.Capacity
      }
    })
    setUser({ ...user, classes: newClassesId })
    setSchedule(newClasses)
    setScheduleMessage(data.message)
  }
  const onDeleteStudentClicked = async (e) => {
    const data = await UserService.deleteUser({ id: e.target.id })
    if (data.message.msgError) {
      setMessage(data.message)
    } else {
      localStorage.removeItem('studentToEdit')
      console.log(data.message.msgBody)
      navigate('/admin-panel')
    }
  }
  const handleSearchInput = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value })
  }

  return (
    <>
      <HomeHeader />

      <section className="profile__student-info">
        <h1>{user.firstName}'s Profile</h1>
        <div className="profile__totals">
          <p>TOTAL CREDITS: {credits}</p>
          <p>TOTAL TUITION: ${tuition}.00</p>
        </div>
        <div>
          <button
            className="home-header__button"
            title="Edit"
            onClick={onEditInfoClicked}
          >
            Edit Account
          </button>
          <button
            className="home-header__button"
            title="Delete"
            id={user._id}
            onClick={onDeleteStudentClicked}
          >
            Delete Student
          </button>
        </div>
      </section>
      <section className="profile__courses-schedule">
        <div className="table-responsive profile__schedule profile__box">
          <h2>Schedule</h2>
          <p className="messageError">{scheduleMessage?.msgBody}</p>
          {schedule.length < 1 ? (
            <p>'No Registered Classes'</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Course ID</th>
                  <th scope="col">Course Title</th>
                  <th scope="col">Room Number</th>
                  <th scope="col">Credits</th>
                  <th scope="col">Tuition Cost</th>
                  <th scope="col">Remove Class</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((course) => {
                  return (
                    <CourseScheduleRow
                      key={course._id}
                      remove={onRemoveClassClicked}
                      course={course}
                    />
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="table-responsive profile__courses profile__box">
          <div className="profile__available-search">
            <h2>Available Courses</h2>
            <div>
              <label className="profile__search-label" htmlFor="courseId">
                Search By Course ID:{' '}
              </label>
              <input
                className="profile__search-input"
                id="courseId"
                name="courseId"
                type="text"
                onChange={handleSearchInput}
              ></input>
              <label className="profile__search-label" htmlFor="courseTitle">
                Search By Course Title:{' '}
              </label>
              <input
                className="profile__search-input"
                id="courseTitle"
                name="courseTitle"
                type="text"
                onChange={handleSearchInput}
              ></input>
            </div>
          </div>
          <p className={allMessage?.msgError ? 'messageError' : 'message'}>
            {allMessage?.msgBody}
          </p>
          {availableCourses.length < 1 ? (
            <p>'Sorry! No Matches Found'</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Course ID</th>
                  <th scope="col">Course Title</th>
                  <th scope="col">Course Description</th>
                  <th scope="col">Room Number</th>
                  <th scope="col">Capacity</th>
                  <th scope="col">Credits</th>
                  <th scope="col">Tuition Cost</th>
                  <th scope="col">Register Class</th>
                </tr>
              </thead>
              <tbody>
                {availableCourses.map((course) => {
                  return (
                    <CourseAvailableRow
                      key={course._id}
                      course={course}
                      add={onAddClassClicked}
                      user={user}
                    />
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <HomeFooter />
    </>
  )
}
export default StudentDetails
