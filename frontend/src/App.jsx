import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './features/auth/Login'
import Register from './features/users/Register'
import StudentProfile from './features/users/StudentProfile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-profile" element={<StudentProfile />} />
      </Route>
    </Routes>
  )
}

export default App
