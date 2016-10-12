import React, { PropTypes } from 'react'
import cloneDeep from 'lodash.clonedeep'
import has from 'lodash.has'

import { toNamedTriple } from '../util'
import { Table, Column, Cell } from './table'

class HeaderCell extends React.Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }
  onClick () {
    this.props.onClick(this.props.columnKey)
  }
  render () {
    let { sortBy, sortOrder, columnKey } = this.props
    let symbol = ''
    if (sortBy === columnKey) {
      symbol = sortOrder === 'asc' ? '\u2191' : '\u2193'
    }
    return (
      <Cell>
        <a id={this.props.children} onClick={this.onClick}>{this.props.children + ' ' + symbol}</a>
      </Cell>
    )
  }
}
HeaderCell.propTypes = {
  onClick: PropTypes.func,
  sortBy: PropTypes.string,
  sortOrder: PropTypes.string,
  columnKey: PropTypes.string,
  children: PropTypes.string
}

class TextCell extends React.Component {
  render () {
    let { data, columnKey, ...props } = this.props
    let text = (!has(data, columnKey) || data[columnKey] !== '')
      ? data[columnKey]
      : props.defaultText

    if (has(data, columnKey + '_formatted')) {
      text = data[columnKey + '_formatted']
    }

    return (
      <Cell data={data} {...props}>
        <span title={text}>{text}</span>
      </Cell>
    )
  }
}
TextCell.defaultProps = {
  defaultText: 'N/A'
}
TextCell.propTypes = {
  data: PropTypes.any,
  columnKey: PropTypes.any
}

class ProductCell extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      annotation: (has(props.annotations, props.data.id))
        ? props.annotations[props.data.id]
        : ''
    }

    this.onNameClick = this.onNameClick.bind(this)
    this.onCompareClick = this.onCompareClick.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  onNameClick () {
    this.props.onNameClick(this.props.data)
  }

  onCompareClick () {
    this.props.onCompareClick(this.props.data)
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
    let { data, ...props } = this.props
    let namedTripled = ''
    namedTripled += typeof data.Brand === 'undefined' ? '' : data.Brand + ' '
    namedTripled += typeof data.Series === 'undefined' ? '' : data.Series + ' '
    namedTripled += typeof data.Model === 'undefined' ? '' : data.Model
    return (
      <Cell data={data} {...props}>
        <div className='row'>
          <div className='three columns'>
            <img src={data.image} />
          </div>
          <div className='nine columns'>
            <a onClick={this.onNameClick}>{namedTripled}</a>
          </div>
        </div>
        <div className='row'>
          <div className='three columns compare-a'>
            <a onClick={this.onCompareClick}>Compare</a>
          </div>
          <div className='nine columns'>
            <input onChange={this.onInputChange} className='u-full-width annotationField' value={this.state.annotation} />
          </div>
        </div>
      </Cell>
    )
  }
}

ProductCell.defaultProps = {
  onNameClick: () => {},
  onCompareClick: () => {},
  onChangeAnnotation: () => {},
  annotations: {}
}

ProductCell.propTypes = {
  data: PropTypes.any,
  annotations: PropTypes.any,
  columnKey: PropTypes.any,
  onNameClick: PropTypes.func,
  onCompareClick: PropTypes.func,
  onChangeAnnotation: PropTypes.func
}
//             <i className='icono-bookmarkEmpty compareButton' />
export class ProductTable extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 0,
      pageSize: 10,
      sortBy: 'Name',
      sortOrder: 'asc'
    }

    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)

    this.updateSort = this.updateSort.bind(this)
  }

  updateSort (sortKey) {
    // If currently selected, flip sortOrder
    if (sortKey === this.state.sortBy) {
      this.setState({
        sortOrder: this.state.sortOrder === 'asc' ? 'desc' : 'asc'
      })
    } else {
      this.setState({
        sortBy: sortKey,
        sortOrder: 'asc'
      })
    }
  }

  prevPage () {
    if (this.state.page > 0) {
      this.setState({
        page: this.state.page - 1
      })
    }
  }

  nextPage () {
    let maxPages = Math.floor(this.props.data.length / this.state.pageSize)
    if (this.state.page < maxPages) {
      this.setState({
        page: this.state.page + 1
      })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.data !== this.props.data ||
      nextProps.annotations !== this.props.annotations ||
      nextState.filters !== this.state.filters ||
      nextState.page !== this.state.page ||
      nextState.pageSize !== this.state.pageSize ||
      nextState.sortBy !== this.state.sortBy ||
      nextState.sortOrder !== this.state.sortOrder
  }

  render () {
    let dataClone = cloneDeep(this.props.data)
    let sortedData = []
    if (this.state.sortBy !== 'Name') {
      sortedData = dataClone.sort((a, b) => {
        if (this.state.sortOrder === 'asc') {
          if (a[this.state.sortBy] > b[this.state.sortBy]) return 1
          if (a[this.state.sortBy] < b[this.state.sortBy]) return -1
        } else {
          if (a[this.state.sortBy] > b[this.state.sortBy]) return -1
          if (a[this.state.sortBy] < b[this.state.sortBy]) return 1
        }
        return 0
      })
    } else {
      sortedData = dataClone.sort((a, b) => {
        let vA = toNamedTriple(a).toUpperCase()
        let vB = toNamedTriple(b).toUpperCase()
        if (this.state.sortOrder !== 'asc') {
          let vT = vA
          vA = vB
          vB = vT
        }

        if (vA < vB) return -1
        if (vA > vB) return 1
        return 0
      })
    }

    // Get page of data
    let start = this.state.page * this.state.pageSize
    let dataSubset = sortedData.slice(start, start + this.state.pageSize)
    return (
      <div className={this.props.className}>
        <Table
          data={dataSubset}>
          <Column
            columnKey='Name'
            header={
              <HeaderCell onClick={this.updateSort}
                sortBy={this.state.sortBy}
                sortOrder={this.state.sortOrder}>
                Name
              </HeaderCell>}>
            <ProductCell
              annotations={this.props.annotations}
              onChangeAnnotation={this.props.onChangeAnnotation}
              onNameClick={this.props.onNameClick}
              onCompareClick={this.props.onCompareClick} />
          </Column>
          <Column
            columnKey='_CPU_Speed'
            header={
              <HeaderCell onClick={this.updateSort}
                sortBy={this.state.sortBy}
                sortOrder={this.state.sortOrder}>
                CPU Speed
              </HeaderCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='_Number_of_Cores'
            header={
              <HeaderCell onClick={this.updateSort}
                sortBy={this.state.sortBy}
                sortOrder={this.state.sortOrder}>
                CPU Cores
              </HeaderCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='_Memory'
            header={
              <HeaderCell onClick={this.updateSort}
                sortBy={this.state.sortBy}
                sortOrder={this.state.sortOrder}>
                Memory
              </HeaderCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='_Screen_Size'
            header={
              <HeaderCell onClick={this.updateSort}
                sortBy={this.state.sortBy}
                sortOrder={this.state.sortOrder}>
                Screen Size
              </HeaderCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='_Weight'
            header={
              <HeaderCell onClick={this.updateSort}
                sortBy={this.state.sortBy}
                sortOrder={this.state.sortOrder}>
                Weight
              </HeaderCell>}>
            <TextCell />
          </Column>
        </Table>
        <button className='prevBtn' onClick={this.prevPage}>
          Previous
        </button>
        <div className='info'>
          <span>
            {'Page' + ' ' + this.state.page + ' of ' + Math.floor(this.props.data.length / this.state.pageSize)}
          </span>
          <span>
            {' || ' + this.props.data.length + ' results'}
          </span>
        </div>
        <button className='nextBtn' onClick={this.nextPage}>
          Next
        </button>
      </div>
    )
  }
}

ProductTable.defaultProps = {
  onNameClick: () => {},
  onCompareClick: () => {},
  onChangeAnnotation: () => {},
  className: '',
  filters: {},
  data: [],
  annotations: {}
}

ProductTable.propTypes = {
  onNameClick: PropTypes.func,
  onCompareClick: PropTypes.func,
  onChangeAnnotation: PropTypes.func,
  className: PropTypes.string,
  filters: PropTypes.any,
  data: PropTypes.array,
  annotations: PropTypes.any
}

export default ProductTable
