import { createSelector } from 'reselect'
import { selectCanvas } from '../../reducer'

export const selectElements = createSelector(
  selectCanvas,
  state => state.elements
)
