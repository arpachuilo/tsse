import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import filterableReducer from './filterableReducer'
import compareReducer from './compareReducer'
import annotationReducer from './annotationReducer'

export default combineReducers({
  annotations: annotationReducer,
  comparing: compareReducer,
  data: filterableReducer,
  router: routerStateReducer
})
