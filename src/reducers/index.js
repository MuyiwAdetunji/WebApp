import { combineReducers } from 'redux'
import { searchReducer } from './searchReducer'
import { cartReducer } from './cartReducer'
import { userReducer } from './userReducer'
import { drawerReducer } from './drawerReducer'
import { menuDrawerReducer } from './menuDrawerReducer'

const rootReducer = combineReducers({
  search: searchReducer,
  cart: cartReducer,
  user: userReducer,
  drawer: drawerReducer,
  menuDrawer: menuDrawerReducer,
})

export default rootReducer
