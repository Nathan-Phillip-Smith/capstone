import { useEffect } from 'react'
import axios from 'axios'
import HomeFooter from '../../components/HomeFooter'
import HomeHeader from '../../components/HomeHeader'
import { useNavigate } from 'react-router-dom'

const StudentProfile = () => {
  let navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get('http://localhost:3500/student-profile', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log('hello')
        console.log(err)
      })
  }, [])

  return (
    <>
      <HomeHeader />
      <h1>StudentProfile</h1>
      <HomeFooter />
    </>
  )
}
export default StudentProfile
