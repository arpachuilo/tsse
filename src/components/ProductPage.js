import React, { PropTypes } from 'react'
import has from 'lodash.has'

import { toNamedTriple } from '../util'

import config from '../config'

class ProductPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      annotation: (has(props.annotations, props.data.id))
        ? props.annotations[props.data.id]
        : ''
    }

    this.onInputChange = this.onInputChange.bind(this)
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
    return (
      <div className={this.props.className}>
        <div className='row product header'>
          <div className='three columns productImage'>
            <img src={data.image} />
          </div>
          <div className='nine columns'>
            <div className='row'>
              <h5>{toNamedTriple(data)}</h5>
            </div>
            <div className='row'>
              <div className='four columns'>
                <div className='row'>
                  <a target='_blank' href={data.neweggUrl}>Newegg</a>
                </div>
                <div className='row'>
                  {'Newegg Price: ' + data.neweggPrice}
                </div>
                <div className='row'>
                  {'Newegg Rating: ' + data.neweggRating}
                </div>
              </div>
              <div className='four columns'>
                <div className='row'>
                  <a target='_blank' href={data.amazonUrl}>Amazon</a>
                </div>
                <div className='row'>
                  {'Amazon Price: ' + data.amazonPrice}
                </div>
                <div className='row'>
                  {'Amazon Rating: ' + data.amazonRating}
                </div>
              </div>
              <div className='four columns'>
                <div className='row'>
                  <a target='_blank' href={data.bestbuyUrl}>Best Buy</a>
                </div>
                <div className='row'>
                  {'Best Buy Price: ' + data.bestbuyPrice}
                </div>
                <div className='row'>
                  {'Best Buy Rating: ' + data.bestbuyRating}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row specsTable'>
          {config.specsToShow.map((d, i) => {
            let key = d.split('_').join(' ')
            let value = data[d]
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
          <div className='two columns'>
            <span>Annotation: </span>
          </div>
          <div className='ten columns'>
            <input onChange={this.onInputChange} className='u-full-width annotationField' value={this.state.annotation} />
          </div>
        </div>
      </div>
    )
  }
}

ProductPage.defaultProps = {
  data: {},
  annotations: {},
  className: '',
  onChangeAnnotation: () => {}
}

ProductPage.propTypes = {
  data: PropTypes.any,
  className: PropTypes.string,
  annotations: PropTypes.any,
  onChangeAnnotation: PropTypes.func
}

export default ProductPage
