export const userReducer = (
  // JSON.parse(localStorage.getItem('tink_user')) || null,
  // state = localStorage.getItem('tink_user') !== undefined
  //   ? JSON.parse(localStorage.getItem('tink_user'))
  //   : null,
  state = JSON.parse(localStorage.getItem('tink_user') || 'null'),
  action
) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return action.payload
    case 'LOGOUT':
      return action.payload
    default:
      return state
  }
}
