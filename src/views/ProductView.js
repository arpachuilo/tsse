import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { removeProduct, addProduct, updateAnnotation } from '../redux/actions'

import ProductTable from '../components/ProductTable'

class ProductView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      openProducts: []
    }

    this.openProductPage = this.openProductPage.bind(this)
    this.addToCompare = this.addToCompare.bind(this)
    this.updateAnnotation = this.updateAnnotation.bind(this)
  }

  openProductPage (data) {
    this.setState({
      openProducts: this.state.openProducts.concat(data)
    })
  }

  addToCompare (data) {
    this.props.addProduct(data)
  }

  updateAnnotation (id, annotation) {
    this.props.updateAnnotation(id, annotation)
  }

  render () {
    return (
      <div>
        <ProductTable className='productTable'
          data={this.props.data}
          annotations={this.props.annotations}
          onCompareClick={this.addToCompare}
          onNameClick={this.openProductPage}
          onChangeAnnotation={this.updateAnnotation} />
      </div>
    )
  }
}

ProductView.defaultProps = {
  data: [],
  annotations: {}
}

ProductView.propTypes = {
  data: PropTypes.any,
  annotations: PropTypes.any,
  removeProduct: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  updateAnnotation: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    data: state.data.filtered,
    annotations: state.annotations.annotations
  }
}

const mapDispatchToProps = {
  removeProduct,
  addProduct,
  updateAnnotation
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductView)
