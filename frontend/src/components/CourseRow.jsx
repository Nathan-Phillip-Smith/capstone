const CourseRow = (props) => {
  return (
    <tr id={props.id} onClick={props.courseClick}>
      <th id={props.id}>{props.course['Course ID']}</th>
      <td id={props.id}>{props.course['Course Title']}</td>
      <td id={props.id}>{props.course['Course Description']}</td>
      <td id={props.id}>{props.course['Classroom Number']}</td>
      <td id={props.id}>{props.course['Capacity']}</td>
      <td id={props.id}>{props.course['Credit Hours']}</td>
      <td id={props.id}>${props.course['Tuition Cost']}.00</td>
    </tr>
  )
}

export default CourseRow
