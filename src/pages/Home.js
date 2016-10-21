import React, { PropTypes } from 'react'

import ProductView from '../views/ProductView'
import FilterView from '../views/FilterView'
import CompareView from '../views/CompareView'

class Home extends React.Component {
  render () {
    let filterPanelClassName = 'two columns filterPanel'
    let hiddenCount = 0
    let compareMissing = false
    if (!this.props.filterPanelActive) {
      filterPanelClassName = 'filterPanel inactivePanel'
      hiddenCount++
    }
    let comparePanelClassName = 'two columns comparePanel'
    if (!this.props.comparePanelActive) {
      compareMissing = true
      comparePanelClassName = 'comparePanel inactivePanel'
      hiddenCount++
    } else if (hiddenCount === 1) {
      comparePanelClassName = 'four columns comparePanel'
    }
    let productPanelClassName = 'eight columns container'
    if (hiddenCount === 2) {
      productPanelClassName = 'page-container'
    } else if (hiddenCount === 1 && compareMissing) {
      productPanelClassName = 'ten columns container'
    }

    return (
      <div className='row page-container'>
        {
          (this.props.filterPanelActive)
          ? (
            <div className={filterPanelClassName}>
              <FilterView />
            </div>
          )
          : undefined
        }
        <div className={productPanelClassName}>
          <div className='row'>
            <ProductView />
          </div>
        </div>
        {
          (this.props.comparePanelActive)
          ? (
            <div className={comparePanelClassName}>
              <CompareView className={comparePanelClassName} />
            </div>
          )
          : undefined
        }
      </div>
    )
  }
}

Home.defaultProps = {
  filterPanelActive: true,
  comparePanelActive: true
}

Home.propTypes = {
  filterPanelActive: PropTypes.bool,
  comparePanelActive: PropTypes.bool
}

export default Home
