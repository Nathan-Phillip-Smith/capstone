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
}