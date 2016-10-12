import has from 'lodash.has'

import { updateFilter, clearFilters } from './filterable'
import { UPDATE_FILTER, CLEAR_FILTERS } from '../actions'

import products from '../../data/products.json'
import noimage from '../../data/noimage.png'

import config from '../../config'

// Clean up product information . . .
// NOTE: Makes large assumptions of data . . .
products.forEach((d, i) => {
  d.id = i
  if (!has(d, 'image')) {
    d.image = noimage
  }
  // Only specs that can be numerically sorted are altered
  if (has(d, 'Memory')) {
    d._Memory = +(d.Memory.split(' ')[0])
    d._Memory_formatted = d._Memory + ' GB'
  } else {
    d._Memory = 0
    d._Memory_formatted = '-'
  }
  if (has(d, 'SSD')) {
    d._SSD = +(d.SSD.split(' ')[0])
    d._SSD_formatted = d._SSD + ' GB'
  } else {
    d._SSD = 0
    d._SSD_formatted = '-'
  }
  if (has(d, 'HDD')) {
    // NOTE COULD BE IN TB RANGE!
    d._HDD = +(d.HDD.split(' ')[0])
    d._HDD_formatted = d._HDD + ' GB'
    if (d.HDD.split(' ')[1] === 'TB') {
      d._HDD = d._HDD * 1000
      d._HDD_formatted = (d._HDD / 1000) + ' TB'
    }
  } else {
    d._HDD = 0
    d._HDD_formatted = '-'
  }
  if (has(d, 'Memory_Speed')) {
    d._Memory_Speed = +(d.Memory_Speed.split(' ')[1])
    d._Memory_Speed_formatted = d._Memory_Speed + ' MHz'
  } else {
    d._Memory_Speed = 0
    d._Memory_Speed_formatted = '-'
  }
  if (has(d, 'CPU_Speed')) {
    d._CPU_Speed = +(d.CPU_Speed.substring(
      d.CPU_Speed.lastIndexOf('(') + 1, d.CPU_Speed.lastIndexOf(')')
    ).split(' ')[0])
    d._CPU_Speed_formatted = d._CPU_Speed + ' GHz'
  } else {
    d._CPU_Speed = 0
    d._CPU_Speed_formatted = '-'
  }
  if (has(d, 'CPU_L3_Cache')) {
    d._CPU_L3_Cahce = +(d.CPU_L3_Cache.split(' ')[0])
    d._CPU_L3_Cahce_formatted = d._CPU_L3_Cahce + ' MB'
  } else {
    d._CPU_L3_Cahce = 0
    d._CPU_L3_Cahce_formatted = '-'
  }
  if (has(d, 'CPU_L2Cache')) {
    d._CPU_L2_Cahce = +(d.CPU_L2Cache.split(' ')[0])
    d._CPU_L2_Cahce_formatted = d._CPU_L2_Cahce + ' MB'
  } else {
    d._CPU_L2_Cahce = 0
    d._CPU_L2_Cahce_formatted = '-'
  }
  if (has(d, 'Screen_Size')) {
    d._Screen_Size = +(d.Screen_Size.replace('"', ''))
    d._Screen_Size_formatted = d._Screen_Size + '"'
  } else {
    d._Screen_Size = 0
    d._Screen_Size_formatted = '-'
  }
  if (has(d, 'Resolution')) {
    d._Resolution = (+d.Resolution.split(' ')[0]) * (+d.Resolution.split(' ')[2])
    d._Resolution_formatted = d.Resolution
  } else {
    d._Resolution = 0
    d._Resolution_formatted = '-'
  }
  if (has(d, 'Weight')) {
    d._Weight = +(d.Weight.split(' ')[0])
    d._Weight_formatted = d._Weight + ' lbs'
  } else {
    d._Weight = 0
    d._Weight_formatted = '-'
  }
  if (has(d, 'Number_of_Cores')) {
    d._Number_of_Cores = d.Number_of_Cores.includes('Dual-core') ? 2 : 4
    d._Number_of_Cores_formatted = d._Number_of_Cores
  } else {
    d._Number_of_Cores = 0
    d._Number_of_Cores_formatted = '-'
  }
  if (has(d, 'Battery_Life')) {
    d._Battery_Life = +(d.Battery_Life.split(' ')[2])
    d._Battery_Life_formatted = d._Battery_Life + ' hrs'
  } else {
    d._Battery_Life = 0
    d._Battery_Life_formatted = '-'
  }
  if (has(d, 'Max_Memory_Supported')) {
    d._Max_Memory_Supported = +(d.Max_Memory_Supported.split(' ')[0])
    d._Max_Memory_Supported_formatted = d._Max_Memory_Supported + ' GB'
  } else {
    d._Max_Memory_Supported = 0
    d._Max_Memory_Supported_formatted = '-'
  }
})

console.log(products)

// Collect possible values for each filter field
let filters = []
for (let i = 0; i < config.filters.length; i++) {
  let filter = config.filters[i]
  filters.push({
    label: filter,
    formattedLabel: filter.split('_').join(' '),
    fieldNames: [],
    fields: []
  })
  for (let j = 0; j < products.length; j++) {
    let datum = products[j]
    // These ones were not processed . . .
    let value = datum[filter]
    let formattedValue = datum[filter]
    if (filter !== 'Brand' && filter !== 'Series' && filter !== 'Color' && filter !== 'Usage') {
      let modifiedFilter = '_' + filter
      filters[i].label = modifiedFilter
      value = datum[modifiedFilter]
      modifiedFilter += '_formatted'
      formattedValue = datum[modifiedFilter]
    }
    if (typeof value !== 'undefined') {
      if (!filters[i].fieldNames.includes(value) && value !== 0) {
        filters[i].fields.push({
          field: value,
          formattedField: formattedValue,
          on: false,
          count: 1,
          currentCount: 1
        })
        filters[i].fieldNames.push(value)
      } else {
        let fieldIndex = filters[i].fieldNames.indexOf(value)
        if (fieldIndex > -1) {
          filters[i].fields[fieldIndex].count++
          filters[i].fields[fieldIndex].currentCount++
        }
      }
    }
  }
}

console.log(filters)

const initialState = {
  raw: products,
  filtered: products,
  filters: filters
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILTER: {
      return updateFilter(state, action.label, action.field)
    }
    case CLEAR_FILTERS: {
      return clearFilters(state)
    }
  }
  return state
}
