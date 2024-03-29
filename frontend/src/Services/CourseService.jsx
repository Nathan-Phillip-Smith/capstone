export default {
  getCourses: async () => {
    const response = await fetch('/courses/view-courses', {
      method: 'get',
      credentials: 'include',
    })
    if (response.status !== 401) {
      return response.json().then((data) => data)
    } else return { message: { msgBody: 'Unauthorized', msgError: true } }
  },
  getCourse: async (data) => {
    const response = await fetch('/courses/get-course', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (response.status !== 401) {
      return response.json().then((data) => data)
    } else return { message: { msgBody: 'Unauthorized', msgError: true } }
  },
  addClass: async (data) => {
    const response = await fetch('/courses/add-class', {
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
    const response = await fetch('/courses/remove-class', {
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
  editCourse: async (course) => {
    const response = await fetch('/courses/edit-course', {
      method: 'post',
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (response.status !== 401) {
      return response.json().then((data) => data)
    } else return { message: { msgBody: 'Unauthorized', msgError: true } }
  },
  createCourse: async (course) => {
    const response = await fetch('/courses/create-course', {
      method: 'post',
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (response.status !== 401) {
      return response.json().then((data) => data)
    } else return { message: { msgBody: 'Unauthorized', msgError: true } }
  },
  deleteCourse: async (data) => {
    const response = await fetch('/courses/delete-course', {
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
