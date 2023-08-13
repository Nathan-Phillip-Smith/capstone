import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import StudentProfile from './components/StudentProfile'
import AdminPanel from './components/AdminPanel'
import StudentPrivateRoutes from './hocs/StudentPrivateRoutes'
import AdminPrivateRoutes from './hocs/AdminPrivateRoutes'
import UnPrivateRoutes from './hocs/UnPrivateRoutes'
import StudentProfileEdit from './components/StudentProfileEdit'
import CourseEdit from './components/CourseEdit'
import CourseCreate from './components/CourseCreate'
import StudentDetails from './components/StudentDetails'
import StudentDetailsEdit from './components/StudentDetailsEdit'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<UnPrivateRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<StudentPrivateRoutes />}>
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/student-edit" element={<StudentProfileEdit />} />
        </Route>
        <Route element={<AdminPrivateRoutes />}>
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/edit-course" element={<CourseEdit />} />
          <Route path="/create-course" element={<CourseCreate />} />
          <Route path="/student-details" element={<StudentDetails />} />
          <Route
            path="/student-details-edit"
            element={<StudentDetailsEdit />}
          />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
