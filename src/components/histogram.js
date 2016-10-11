import React, { PropTypes } from 'react'

class Histogram extends React.Component {
  constructor (props) {
    super(props)

    this.createChart = this.createChart.bind(this)
    this.updateChart = this.updateChart.bind(this)
    this.removeChart = this.removeChart.bind(this)
  }

  createChart () {

  }

  updateChart () {

  }

  removeChart () {

  }

  componentDidMount () {
    this.createChart()
  }

  componentWillUnmount () {
    this.removeChart()
  }

  shouldComponentUpdate () {
    this.updateChart()
    return false
  }

  render () {
    return (
      <div className='root' />
    )
  }
}

Histogram.defaultProps = {
  xAccessor: 'key',
  yAccessor: 'value'
}

Histogram.propTypes = {
  xAccessor: PropTypes.string,
  yAccessor: PropTypes.string
}

export default Histogram
