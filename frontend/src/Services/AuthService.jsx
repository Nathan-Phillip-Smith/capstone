export default {
  login: async (user) => {
    const response = await fetch('http://localhost:3500/users/login', {
      method: 'post',
      body: JSON.stringify(user),
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
        message: { msgBody: 'Invalid Username or Password', msgError: true },
      }
  },
  register: async (user) => {
    const response = await fetch('http://localhost:3500/users/register', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status !== 401) {
      return response.json()
    } else
      return {
        isAuthenticated: false,
        user: { username: '', roles: [], classes: [] },
      }
  },
  logout: () => {
    return fetch('http://localhost:3500/users/logout', {
      method: 'get',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => data)
  },
  isAuthenticated: async () => {
    const response = await fetch('http://localhost:3500/users/authenticated', {
      method: 'get',
      credentials: 'include',
    })
    if (response.status !== 401) {
      return response.json().then((data) => data)
    } else {
      return {
        isAuthenticated: false,
        user: { username: '', roles: [], classes: [] },
      }
    }
  },
}
