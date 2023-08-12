const StudentRow = (props) => {
  return (
    <tr id={props.id} onClick={props.studentClick}>
      <th id={props.id}>{props.student.username}</th>
      <td id={props.id}>{props.student.firstName}</td>
      <td id={props.id}>{props.student.lastName}</td>
      <td id={props.id}>{props.student.email}</td>
      <td id={props.id}>{props.student.address}</td>
      <td id={props.id}>{props.student.phone}</td>
    </tr>
  )
}

export default StudentRow
