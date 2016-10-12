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

    this.onCheckMark = this.onCheckMark.bind(this)
  }

  onCheckMark (event) {
    this.props.onCheckMark(this.props.label, event.currentTarget.value)
  }

  render () {
    return (
      <div className='filterContainer'>
        <div className='row filterLabel'>{this.props.formattedLabel}</div>
        <div className='row filterListing'>
          {this.props.options.map((d, i) => {
            return (
              <div key={i} className='row filterField'>
                <input type='radio'
                  value={d.field}
                  checked={d.on}
                  onChange={this.onCheckMark} />
                <span>{d.formattedField}</span>
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
