import { removeProduct, addProduct, clearProduct } from './compare'
import { REMOVE_PRODUCT, ADD_PRODUCT, CLEAR_PRODUCT } from '../actions'

const initialState = {
  products: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT: {
      return removeProduct(state, action.product)
    }
    case ADD_PRODUCT: {
      return addProduct(state, action.product)
    }
    case CLEAR_PRODUCT: {
      return clearProduct()
    }
  }
  return state
}
