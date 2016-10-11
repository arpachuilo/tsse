import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { List } from '../views/List'

class Home extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <List items={this.props.items} />
        </div>
      </div>
    )
  }
}

Home.defaultProps = {
  items: []
}

Home.propTypes = {
  items: PropTypes.any
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    items: state.list.items
  }
}

export default connect(mapStateToProps, {})(Home)
