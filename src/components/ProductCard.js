import React, { PropTypes } from 'react'
import has from 'lodash.has'

import config from '../config'
import { toNamedTriple } from '../util'

class ProductCard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      annotation: (has(props.annotations, props.data.id))
        ? props.annotations[props.data.id]
        : ''
    }

    this.focusInput = this.focusInput.bind(this)
    this.onRemoveClick = this.onRemoveClick.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  focusInput () {
    this.refs.input.focus()
  }

  onRemoveClick () {
    this.props.onRemoveClick(this.props.data)
  }

  onInputChange (event) {
    this.props.onChangeAnnotation(this.props.data.id, event.target.value)
    this.setState({
      annotation: event.target.value
    })
  }

  componentWillReceiveProps (nextProps) {
    let annotation = ''

    if (has(nextProps.annotations, nextProps.data.id)) {
      annotation = nextProps.annotations[nextProps.data.id]
    }

    this.setState({
      annotation
    })
  }

  render () {
    let { data } = this.props
    let specList = config.inCompareView
    return (
      <div className='row productCard'>
        <div className='row image'>
          <div className='ten columns'>
            <img src={data.image} />
          </div>
          <div className='two columns'>
            <i className='icono-crossCircle' onClick={this.onRemoveClick} />
          </div>
        </div>
        <div className='row name'>
          <a>{toNamedTriple(data)}</a>
        </div>
        <div className='row specs'>
          {specList.map((d, i) => {
            let key = d.split('_').join(' ')
            let value = data['_' + d + '_formatted']
            let chipString = key + ': ' + value
            let style = {}
            if (value === '-') style.display = 'none'
            return (
              <span key={i} className='chip' style={style}>
                {chipString}
              </span>
            )
          })}
        </div>
        <div className='row annotation'>
          <i className='icono-comment' style={{float: 'left'}} onClick={this.focusInput} />
          <input ref='input' onChange={this.onInputChange} className='annotationField nine columns' value={this.state.annotation} />
        </div>
      </div>
    )
  }
}

ProductCard.defaultProps = {
  data: {},
  annotations: {},
  onRemoveClick: () => {},
  onChangeAnnotation: () => {}
}

ProductCard.propTypes = {
  data: PropTypes.any,
  annotations: PropTypes.any,
  onRemoveClick: PropTypes.func,
  onChangeAnnotation: PropTypes.func
}

export default ProductCard
