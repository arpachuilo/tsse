const removeProduct = (state, product) => {
  let products = []
  state.products.forEach((d, i) => {
    if (d.id !== product.id) {
      products.push(d)
    }
  })
  return {
    products: products
  }
}

const addProduct = (state, product) => {
  return {
    products: state.products.concat(product)
  }
}

const clearProduct = () => {
  return {
    products: []
  }
}

export { addProduct, removeProduct, clearProduct }
