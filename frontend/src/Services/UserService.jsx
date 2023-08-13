export default {
  getUser: async () => {
    const response = await fetch('http://localhost:3500/users/student', {
      method: 'get',
      credentials: 'include',
    })
    if (response.status !== 401) {
      return response.json().then((data) => data)
    } else return { message: { msgBody: 'Unauthorized', msgError: true } }
  },
  getUserFromId: async (user) => {
    const response = await fetch('http://localhost:3500/users/student-id', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (response.status !== 401) {
      return response.json().then((data) => data)
    } else return { message: { msgBody: 'Unauthorized', msgError: true } }
  },

  editUser: async (user) => {
    const response = await fetch('http://localhost:3500/users/edit-user', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (response.status !== 401) {
      return response.json().then((data) => data)
    } else return { message: { msgBody: 'Unauthorized', msgError: true } }
  },

  getStudents: async () => {
    const response = await fetch('http://localhost:3500/users/students', {
      method: 'get',
      credentials: 'include',
    })
    if (response.status !== 401) {
      return response.json().then((data) => data)
    } else return { message: { msgBody: 'Unauthorized', msgError: true } }
  },
  deleteUser: async (data) => {
    const response = await fetch('http://localhost:3500/users/delete-User', {
      method: 'delete',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (response.status !== 401) {
      return response.json()
    } else
      return {
        isAuthenticated: false,
        user: { username: '', roles: [], classes: [] },
      }
  },
}
