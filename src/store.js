import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import userReducer from './reducers/user'


const reducer = combineReducers({
  user: userReducer
})

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
