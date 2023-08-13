import HomeFooter from './Footer'
import HomeHeader from './Header'
import { useEffect, useState } from 'react'
import CourseService from '../Services/CourseService'
import UserService from '../Services/UserService'
import StudentRow from './StudentRow'
import CourseRow from './CourseRow'
import CourseDetails from './CourseDetails'
import { useNavigate } from 'react-router-dom'

const AdminPanel = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [availableCourses, setAvailableCourses] = useState([])
  const [courseClicked, setCourseClicked] = useState({
    id: '',
    clickedCourse: [],
    clicked: false,
    students: [],
  })
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [message, setMessage] = useState(null)
  const [courseSearch, setCourseSearch] = useState({
    courseId: '',
    courseTitle: '',
  })
  const [studentSearch, setStudentSearch] = useState({
    studentUsername: '',
    studentLastName: '',
  })

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
  }, [courseClicked])

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await UserService.getStudents()
      if (data?.message) {
        const onlyStudents = data.students.filter(
          (user) => !user.roles.includes('admin')
        )
        setMessage(data.message)
        setStudents(onlyStudents)
      }
    }
    fetchStudents()
  }, [])

  useEffect(() => {
    let filteredStudentsArray = [...students]

    if (studentSearch.studentUsername.length > 0) {
      filteredStudentsArray = students.filter((student) =>
        student.username
          .toLowerCase()
          .includes(studentSearch.studentUsername.toLowerCase())
      )
    }
    if (studentSearch.studentLastName.length > 0) {
      filteredStudentsArray = filteredStudentsArray.filter((student) =>
        student.lastName
          .toLowerCase()
          .includes(studentSearch.studentLastName.toLowerCase())
      )
    }
    setFilteredStudents(filteredStudentsArray)
  }, [students, studentSearch])

  useEffect(() => {
    let availableCoursesArray = [...courses]

    if (courseSearch.courseId.length > 0) {
      availableCoursesArray = courses.filter((course) =>
        course['Course ID']
          .toLowerCase()
          .includes(courseSearch.courseId.toLowerCase())
      )
    }
    if (courseSearch.courseTitle.length > 0) {
      availableCoursesArray = availableCoursesArray.filter((course) =>
        course['Course Title']
          .toLowerCase()
          .includes(courseSearch.courseTitle.toLowerCase())
      )
    }
    setAvailableCourses(availableCoursesArray)
  }, [courses, courseSearch])

  const handleCourseSearchInput = (e) => {
    setCourseSearch({ ...courseSearch, [e.target.name]: e.target.value })
  }
  const handleStudentSearchInput = (e) => {
    setStudentSearch({ ...studentSearch, [e.target.name]: e.target.value })
  }

  const handleStudentClick = (e) => {
    localStorage.setItem('studentToEdit', e.target.id)
    navigate('/student-details')
  }
  const handleCourseClick = (e) => {
    let clickedItem = courses.filter((course) => course._id === e.target.id)
    let attachedStudents = students.filter((student) =>
      student.classes.includes(e.target.id)
    )
    setCourseClicked({
      id: e.target.id,
      clicked: true,
      clickedCourse: clickedItem,
      students: attachedStudents,
    })
  }
  const handleResetClickedCourse = () => {
    setCourseClicked({
      id: '',
      clicked: false,
      clickedCourse: [],
      students: [],
    })
    setCourseSearch({
      courseId: '',
      courseTitle: '',
    })
  }
  const handleDeleteClickedCourse = async (e) => {
    const data = await CourseService.deleteCourse({ id: e.target.id })
    if (!data.message.msgError) {
      setMessage(data.message)
      setCourseClicked({
        id: '',
        clicked: false,
        clickedCourse: [],
        students: [],
      })
      setCourseSearch({
        courseId: '',
        courseTitle: '',
      })
    } else {
      console.log(data.message)
    }
  }
  const handleEditClickedCourse = (e) => {
    localStorage.setItem('courseToEdit', e.target.id)
    navigate('/edit-course')
  }
  const handleAddCourse = () => {
    navigate('/create-course')
  }
  const handleRegisterStudent = () => {
    navigate('/admin-register')
  }

  return (
    <>
      <HomeHeader />

      <section className="admin__admin-info">
        <h1>Admin Panel</h1>
      </section>
      <section className="admin__courses-student">
        {/* <p className="messageError">{message?.msgBody}</p> */}
        <div className="table-responsive admin__students admin__box">
          <div className="admin__available-search">
            <div className="admin__course-title">
              <h2>Students</h2>
            </div>
            <div className="admin__search-bar">
              <button
                className="home-header__button"
                onClick={handleRegisterStudent}
              >
                Register Student
              </button>
              <div>
                <label
                  className="admin__search-label"
                  htmlFor="studentUsername"
                >
                  Search By Username:
                </label>
                <input
                  className="admin__search-input"
                  id="studentUsername"
                  name="studentUsername"
                  type="text"
                  onChange={handleStudentSearchInput}
                ></input>
              </div>
              <div>
                <label
                  className="admin__search-label"
                  htmlFor="studentLastName"
                >
                  Search By Last Name:
                </label>
                <input
                  className="admin__search-input"
                  id="studentLastName"
                  name="studentLastName"
                  type="text"
                  onChange={handleStudentSearchInput}
                ></input>
              </div>
            </div>
          </div>
          <p p className="admin__click-table-message">
            Click a student to view schedule and edit students details
          </p>
          {filteredStudents < 1 ? (
            <p>Sorry! No Matches Found</p>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => {
                  return (
                    <StudentRow
                      key={student._id}
                      id={student._id}
                      studentClick={handleStudentClick}
                      student={student}
                    />
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="table-responsive admin__courses admin__box">
          {courseClicked.clicked ? (
            <div className="admin__available-search">
              <div className="admin__course-title">
                <h2>Courses</h2>
                <div className="admin__course-buttons">
                  <button
                    className="home-header__button"
                    title="back"
                    onClick={handleResetClickedCourse}
                  >
                    Show All Courses
                  </button>
                  <button
                    id={courseClicked.id}
                    className="home-header__button"
                    title="edit"
                    onClick={handleEditClickedCourse}
                  >
                    Edit Course
                  </button>
                  <button
                    id={courseClicked.id}
                    className="home-header__button"
                    title="delete"
                    onClick={handleDeleteClickedCourse}
                  >
                    Delete Course
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="admin__available-search">
              <div className="admin__course-title">
                <h2>Courses</h2>
              </div>
              <div className="admin__search-bar">
                <button
                  className="home-header__button"
                  onClick={handleAddCourse}
                >
                  Add Course
                </button>
                <div>
                  <label className="admin__search-label" htmlFor="courseId">
                    Search By Course ID:
                  </label>
                  <input
                    className="admin__search-input"
                    id="courseId"
                    name="courseId"
                    type="text"
                    onChange={handleCourseSearchInput}
                  ></input>
                </div>
                <div>
                  <label className="admin__search-label" htmlFor="courseTitle">
                    Search By Course Title:
                  </label>
                  <input
                    className="admin__search-input"
                    id="courseTitle"
                    name="courseTitle"
                    type="text"
                    onChange={handleCourseSearchInput}
                  ></input>
                </div>
              </div>
            </div>
          )}

          {!courseClicked.clicked ? (
            <p className="admin__click-table-message">
              Click a course to view registered students
            </p>
          ) : (
            ''
          )}
          {availableCourses.length < 1 ? (
            <p>Sorry! No Matches Found</p>
          ) : (
            <>
              {courseClicked.clicked ? (
                <CourseDetails
                  studentClick={handleStudentClick}
                  id={courseClicked.id}
                  students={courseClicked.students}
                  course={courseClicked.clickedCourse}
                />
              ) : (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Course ID</th>
                      <th scope="col">Course Title</th>
                      <th scope="col">Course Description</th>
                      <th scope="col">Room Number</th>
                      <th scope="col">Capacity</th>
                      <th scope="col">Credits</th>
                      <th scope="col">Tuition Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableCourses.map((course) => {
                      return (
                        <CourseRow
                          key={course._id}
                          id={course._id}
                          course={course}
                          courseClick={handleCourseClick}
                        />
                      )
                    })}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </section>

      <HomeFooter />
    </>
  )
}
export default AdminPanel
