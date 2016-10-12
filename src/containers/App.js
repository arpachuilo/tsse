import React, { PropTypes } from 'react'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      filterPanelActive: true,
      comparePanelActive: true
    }

    this.toggleFilterPanel = this.toggleFilterPanel.bind(this)
    this.toggleComparePanel = this.toggleComparePanel.bind(this)
  }

  toggleFilterPanel () {
    this.setState({
      filterPanelActive: !this.state.filterPanelActive
    })
  }

  toggleComparePanel () {
    this.setState({
      comparePanelActive: !this.state.comparePanelActive
    })
  }

  render () {
    let childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        filterPanelActive: this.state.filterPanelActive,
        comparePanelActive: this.state.comparePanelActive
      })
    )

    return (
      <div>
        <div className='row'>
          <nav id='nav'>
            <ul>
              <li className='filterPanelNav' onClick={this.toggleFilterPanel}>
                <i className='icono-hamburger' />
                <span>Filter</span>
              </li>
              <li className='comparePanelNav' onClick={this.toggleComparePanel}>
                <span>Compare</span>
                <i className='icono-hamburger' />
              </li>
            </ul>
          </nav>
        </div>
        <div className='row' id='main'>
          {childrenWithProps}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.any
}

export default App
