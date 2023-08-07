import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import StudentLogin from './features/auth/StudentLogin'
import Register from './features/users/Register'
import AdminLogin from './features/auth/AdminLogin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
