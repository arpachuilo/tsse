import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { removeProduct, addProduct, updateAnnotation } from '../redux/actions'

import { toNamedTriple } from '../util'

import ProductTable from '../components/ProductTable'
import ProductPage from '../components/ProductPage'

class ProductView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      openProducts: [],
      activeTab: 0
    }

    this.openProductPage = this.openProductPage.bind(this)
    this.addToCompare = this.addToCompare.bind(this)
    this.updateAnnotation = this.updateAnnotation.bind(this)
    this.switchTab = this.switchTab.bind(this)
  }

  switchTab (event) {
    this.setState({
      activeTab: +event.currentTarget.id
    })
  }

  openProductPage (data) {
    this.setState({
      openProducts: this.state.openProducts.concat(data)
    }, () => {
      this.setState({
        activeTab: this.state.openProducts.length
      })
    })
  }

  addToCompare (data) {
    let cItem = this.props.currentCompare.find((d) => {
      return d.id === data.id
    })
    if (typeof cItem !== 'undefined') {
      this.props.removeProduct(data)
    } else {
      this.props.addProduct(data)
    }
  }

  updateAnnotation (id, annotation) {
    this.props.updateAnnotation(id, annotation)
  }

  render () {
    let activeTab =
      <ProductTable className='productTable'
        data={this.props.data}
        currentCompare={this.props.currentCompare}
        annotations={this.props.annotations}
        onCompareClick={this.addToCompare}
        onNameClick={this.openProductPage}
        onChangeAnnotation={this.updateAnnotation} />
    if (this.state.activeTab > 0) {
      activeTab = <ProductPage className='productPage'
        annotations={this.props.annotations}
        data={this.state.openProducts[this.state.activeTab - 1]} />
    }
    return (
      <div>
        <div className='row tabContainer'>
          <div id={0} className={this.state.activeTab === 0 ? 'tab active' : 'tab'} onClick={this.switchTab}>
            <span>Results</span>
          </div>
          {this.state.openProducts.map((d, i) => {
            return (
              <div key={i} id={i + 1} className={this.state.activeTab === i + 1 ? 'tab active' : 'tab'} onClick={this.switchTab}>
                <span>{toNamedTriple(d)}</span>
              </div>
            )
          })}
        </div>
        <div className='row currentTab'>
          {activeTab}
        </div>
      </div>
    )
  }
}

ProductView.defaultProps = {
  data: [],
  currentCompare: [],
  annotations: {}
}

ProductView.propTypes = {
  data: PropTypes.any,
  annotations: PropTypes.any,
  removeProduct: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  updateAnnotation: PropTypes.func.isRequired,
  currentCompare: PropTypes.any
}

const mapStateToProps = (state) => {
  return {
    data: state.data.filtered,
    annotations: state.annotations.annotations,
    currentCompare: state.comparing.products
  }
}

const mapDispatchToProps = {
  removeProduct,
  addProduct,
  updateAnnotation
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductView)
