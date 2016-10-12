// Actions for filterable
export const UPDATE_FILTER = 'UPDATE_FILTER'
export const updateFilter = (label, field) => {
  return {
    type: UPDATE_FILTER,
    label,
    field
  }
}

export const CLEAR_FILTER = 'CLEAR_FILTER'
export const clearFilters = () => {
  return {
    type: CLEAR_FILTER
  }
}

// Actions for compared products
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const removeProduct = (product) => {
  return {
    type: REMOVE_PRODUCT,
    product: product
  }
}

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

export const CLEAR_PRODUCT = 'CLEAR_PRODUCT'
export const clearProduct = () => {
  return {
    type: CLEAR_PRODUCT
  }
}

// Actions for annotations
export const UPDATE_ANNOTATION = 'UPDATE_ANNOTATION'
export const updateAnnotation = (id, annotation) => {
  return {
    type: UPDATE_ANNOTATION,
    id,
    annotation
  }
}
