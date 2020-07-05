import { combineReducers } from '@reduxjs/toolkit'
import canvas from './components/Canvas/reducer'
import { RootState } from './store'

export default combineReducers({
  canvas
})

export const selectCanvas = (state: RootState) => state.canvas
