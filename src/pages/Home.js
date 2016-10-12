import React, { PropTypes } from 'react'

import ProductView from '../views/ProductView'
import FilterView from '../views/FilterView'
import CompareView from '../views/CompareView'

class Home extends React.Component {
  render () {
    let filterPanelClassName = 'two columns filterPanel'
    if (!this.props.filterPanelActive) filterPanelClassName += ' inactivePanel'
    let comparePanelClassName = 'two columns comparePanel'
    if (!this.props.comparePanelActive) comparePanelClassName += ' inactivePanel'

    return (
      <div className='row page-container'>
        <div className={filterPanelClassName}>
          <FilterView />
        </div>
        <div className='eight columns container'>
          <div className='row'>
            <ProductView />
          </div>
        </div>
        <div className={comparePanelClassName}>
          <CompareView />
        </div>
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
