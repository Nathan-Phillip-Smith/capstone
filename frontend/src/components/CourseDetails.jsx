import StudentRow from './StudentRow'

const CourseDetails = (props) => {
  const course = props.course[0]
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Course ID</th>
            <th scope="col">Course Title</th>
            <th className="courseDescription" scope="col">
              Course Description
            </th>
            <th scope="col">Room Number</th>
            <th scope="col">Capacity</th>
            <th scope="col">Credits</th>
            <th scope="col">Tuition Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr id={props.id}>
            <th>{course['Course ID']}</th>
            <td>{course['Course Title']}</td>
            <td className="courseDescription">
              {course['Course Description']}
            </td>
            <td>{course['Classroom Number']}</td>
            <td>{course['Capacity']}</td>
            <td>{course['Credit Hours']}</td>
            <td>${course['Tuition Cost']}.00</td>
          </tr>
        </tbody>
      </table>
      <div className="table-responsive admin__students admin__box">
        <div className="admin__available-search">
          <h2>Students Registered for {course['Course Title']}</h2>
        </div>
        <p>Click a student to view schedule and edit students details</p>
        {props.students < 1 ? (
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
              {props.students.map((student) => {
                return (
                  <StudentRow
                    key={student._id}
                    id={student._id}
                    studentClick={props.studentClick}
                    student={student}
                  />
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default CourseDetails
