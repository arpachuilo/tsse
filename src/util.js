const toNamedTriple = (d) => {
  let namedTripled = ''
  namedTripled += typeof d.Brand === 'undefined' ? '' : d.Brand
  namedTripled += typeof d.Series === 'undefined' ? '' : d.Series
  namedTripled += typeof d.Model === 'undefined' ? '' : d.Model
  return namedTripled
}

export { toNamedTriple }
