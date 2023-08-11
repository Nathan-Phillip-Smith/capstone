export default {
  getCourses: async () => {
    const response = await fetch('http://localhost:3500/courses/view-courses', {
      method: 'get',
      credentials: 'include',
    })
    if (response.status !== 401) {
      return response.json().then((data) => data)
    } else return { message: { msgBody: 'Unauthorized', msgError: true } }
  },
  addClass: async (data) => {
    const response = await fetch('http://localhost:3500/courses/add-class', {
      method: 'post',
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

  removeClass: async (data) => {
    const response = await fetch('http://localhost:3500/courses/remove-class', {
      method: 'post',
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
