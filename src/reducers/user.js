
const initState = {
  user: []
}


export const SAVE_USER = 'SAVE_USER'


export const saveUser = (user) => ({type: SAVE_USER, payload: user})



export default (state = initState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {...state, user: action.payload}
    default:
      return state
  }
}
