import cloneDeep from 'lodash.clonedeep'

const updateAnnotation = (state, id, annotation) => {
  // Have to clone otherwise it doesn't get recognized as updated . . .
  let updatedAnnotations = cloneDeep(state.annotations)
  updatedAnnotations[id] = annotation
  return {
    annotations: updatedAnnotations
  }
}

export { updateAnnotation }
