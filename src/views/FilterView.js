import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// "bestbuyPrice": "",
// "bestbuyRating": "",
// "bestbuyUrl": "",
// "amazonPrice": "",
// "amazonRating": "",
// "amazonUrl": "",
// "neweggPrice": "",
// "neweggRating": "",
import { updateFilter } from '../redux/actions'

class FilterListing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      opened: false
    }

    this.onClick = this.onClick.bind(this)
    this.onCheckMark = this.onCheckMark.bind(this)
    this.toggleOpen = this.toggleOpen.bind(this)
  }

  onClick (event) {
    this.props.onCheckMark(this.props.label, event.currentTarget.dataset.value)
  }

  onCheckMark (event) {
    this.props.onCheckMark(this.props.label, event.currentTarget.value)
  }

  toggleOpen () {
    this.setState({
      opened: !this.state.opened
    })
  }

  render () {
    let style = {}
    if (!this.state.opened) {
      style.display = 'none'
    }
    return (
      <div className='filterContainer'>
        <div className='row filterLabel' onClick={this.toggleOpen}>
          <span>{this.props.formattedLabel}</span>
        </div>
        <div className='row filterListing' style={style}>
          {this.props.options.map((d, i) => {
            return (
              <div key={i} className='row filterField'>
                <input type='checkbox'
                  value={d.field}
                  checked={d.on}
                  onChange={this.onCheckMark} />
                <a onClick={this.onClick} data-value={d.field}>{d.formattedField}</a>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

FilterListing.propTypes = {
  label: PropTypes.any,
  formattedLabel: PropTypes.any,
  options: PropTypes.any,
  onCheckMark: PropTypes.any
}

class FilterView extends React.Component {
  render () {
    return (
      <div className='row filterView'>
        {this.props.filters.map((d, i) => {
          // let displayOpen = 'block'
          return (<FilterListing key={i} label={d.label} formattedLabel={d.formattedLabel} options={d.fields} onCheckMark={this.props.updateFilter} />)
        })}
      </div>
    )
  }
}

FilterView.defaultProps = {
  data: [],
  filteredData: [],
  filters: []
}

FilterView.propTypes = {
  data: PropTypes.any,
  filteredData: PropTypes.any,
  filters: PropTypes.any,
  updateFilter: PropTypes.any
}

const mapStateToProps = (state) => {
  return {
    data: state.data.raw,
    filteredData: state.data.filtered,
    filters: state.data.filters
  }
}

const mapDispatchToProps = {
  updateFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterView)
