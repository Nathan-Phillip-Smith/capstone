const CourseAvailableRow = (props) => {
  return (
    <tr>
      <th>{props.course['Course ID']}</th>
      <td>{props.course['Course Title']}</td>
      <td>{props.course['Course Description']}</td>
      <td>{props.course['Classroom Number']}</td>
      <td>{props.course['Capacity']}</td>
      <td>{props.course['Credit Hours']}</td>
      <td>${props.course['Tuition Cost']}.00</td>
      <td>
        {props.user.classes.includes(props.course._id) ? (
          <button
            className="home-header__button-disabled"
            id={props.course._id}
            title="add-class"
            onClick={props.add}
            disabled={true}
          >
            Already Registered
          </button>
        ) : (
          <button
            className="home-header__button"
            id={props.course._id}
            title="add-class"
            onClick={props.add}
          >
            Add Class
          </button>
        )}
      </td>
    </tr>
  )
}

export default CourseAvailableRow
