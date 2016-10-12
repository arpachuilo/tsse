// import mergewith from 'lodash.mergewith'
// import remove from 'lodash.remove'
// import isArray from 'lodash.isarray'
// import isempty from 'lodash.isempty'
// import keys from 'lodash.keys'
// import values from 'lodash.values'
// import has from 'lodash.has'
import cloneDeep from 'lodash.clonedeep'

// private helper function for lodash.mergewith
// const customizer = (objValue, srcValue) => {
//   if (isArray(objValue)) {
//     return objValue.concat(srcValue)
//   }
// }

// private helper function filtering array
const applyFilters = (data, filters) => {
  // Check if all filters are off
  let allOff = true
  filters.forEach((d, i) => {
    d.fields.forEach((f, j) => {
      if (f.on) {
        allOff = false
      }
    })
  })

  if (allOff) {
    return data
  }

  let filteredData = []
  for (let i = 0; i < data.length; i++) {
    let validArr = []
    for (let j = 0; j < filters.length; j++) {
      let atLeastOneActive = false
      for (let k = 0; k < filters[j].fields.length; k++) {
        if (filters[j].fields[k].on) {
          atLeastOneActive = true
          break
        }
      }
      if (atLeastOneActive) {
        let label = filters[j].label
        let atLeastOneOn = false
        for (let k = 0; k < filters[j].fields.length; k++) {
          if (filters[j].fields[k].on && filters[j].fields[k].field === data[i][label]) {
            atLeastOneOn = true
            break
          }
        }
        validArr.push(atLeastOneOn)
      }
    }
    let validTest = true
    for (let j = 0; j < validArr.length; j++) {
      validTest = validTest && validArr[j]
    }
    if (validTest) {
      filteredData.push(data[i])
    }
  }

  return filteredData
}

// NOTE: Overrides current filter values
//  creates filter if it doesn't exist
const updateFilter = (state, label, field) => {
  let filters = cloneDeep(state.filters)
  field = parseInt(field) || field
  let _label = filters.find((d) => {
    return d.label === label
  })
  console.log(label)
  let _field = _label.fields.find((d) => {
    return d.field === field
  })
  _field.on = !_field.on
  return {
    raw: state.raw,
    filtered: applyFilters(state.raw, filters),
    filters: filters
  }
}

const clearFilters = (state) => {
  let filters = cloneDeep(state.filters)
  filters.forEach((d, i) => {
    d.fields.forEach((f, j) => {
      f.on = false
      f.currentCount = f.count
    })
  })
  return {
    raw: state.raw,
    filtered: state.raw,
    filters: filters
  }
}

export { updateFilter, clearFilters }
