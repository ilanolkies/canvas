import { createSelector } from 'reselect'
import { selectCanvas } from '../../reducer'
import memoize from 'lodash/memoize'

export const selectElements = createSelector(
  selectCanvas,
  state => state.elements
)

export const selectElementPositions = createSelector(
  selectElements,
  elements => elements.map(element => ({ top: element.top, left: element.left }))
)

export const selectElementPropsById = createSelector(
  selectElements,
  elements => memoize((id: number) => {
    const { props, type }= elements[id]
    return { props, type }
  })
)

export const selectSelectedElement = createSelector(
  selectCanvas,
  state => state.selectedElement
)
