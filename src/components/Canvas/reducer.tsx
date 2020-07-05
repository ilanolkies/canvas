import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ElementTypes, ElementProps } from '../elements'

export interface ElementState {
  type: ElementTypes,
  props: ElementProps,
  top: number,
  left: number
}

export interface CanvasState {
  elements: ElementState[]
}

const initialState: CanvasState = {
  elements: []
}

export interface AddElementPayload {
  type: ElementTypes,
  props: ElementProps
}

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    addElement({ elements }: CanvasState, element: PayloadAction<AddElementPayload>) {
      elements.push({ ...element.payload, top: 10, left: 10 })
    }
  }
})

export const { addElement } = canvasSlice.actions

export default canvasSlice.reducer
