import React, { PropTypes } from 'react'

export class List extends React.Component {
  render () {
    return (
      <div>
        <span>List</span>
        <ul>
          {this.props.items.map((item, index) => {
            return (
              <li key={index}>{item}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}

List.defaultProps = {
  items: []
}

List.propTypes = {
  items: PropTypes.any
}

export default List
