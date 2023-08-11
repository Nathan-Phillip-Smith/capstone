const CourseScheduleRow = (props) => {
  return (
    <tr>
      <th>{props.course['Course ID']}</th>
      <td>{props.course['Course Title']}</td>
      <td>{props.course['Classroom Number']}</td>
      <td>{props.course['Credit Hours']}</td>
      <td>${props.course['Tuition Cost']}.00</td>
      <td>
        <button
          className="home-header__button"
          id={props.course._id}
          title="remove-class"
          onClick={props.remove}
        >
          Remove Class
        </button>
      </td>
    </tr>
  )
}

export default CourseScheduleRow
