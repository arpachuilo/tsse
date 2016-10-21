import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { removeProduct, updateAnnotation } from '../redux/actions'

import ProductCard from '../components/ProductCard'

class CompareView extends React.Component {
  render () {
    let className = 'row compareView ' + this.props.className
    return (
      <div className={className}>
        {this.props.data.map((d, i) => {
          return (
            <ProductCard key={d.id} data={d}
              annotations={this.props.annotations}
              onNameClick={this.props.openProductPage}
              onChangeAnnotation={this.props.updateAnnotation}
              onRemoveClick={this.props.removeProduct} />
          )
        })}
      </div>
    )
  }
}

CompareView.defaultProps = {
  className: '',
  data: [],
  openProductPage: () => {}
}

CompareView.propTypes = {
  className: PropTypes.string,
  data: PropTypes.any,
  annotations: PropTypes.any,
  openProductPage: PropTypes.func,
  removeProduct: PropTypes.func.isRequired,
  updateAnnotation: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    data: state.comparing.products,
    annotations: state.annotations.annotations
  }
}

const mapDispatchToProps = {
  removeProduct,
  updateAnnotation
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareView)
