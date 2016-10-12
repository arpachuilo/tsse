import { updateAnnotation } from './annotation'
import { UPDATE_ANNOTATION } from '../actions'

const initialState = {
  annotations: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ANNOTATION: {
      return updateAnnotation(state, action.id, action.annotation)
    }
  }
  return state
}
