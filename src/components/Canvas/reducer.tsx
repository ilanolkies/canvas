import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ElementTypes, ElementProps } from '../elements'

export interface AbsolutePosition {
  top: number,
  left: number
}

export interface ElementState extends AbsolutePosition {
  type: ElementTypes,
  props: ElementProps,
}

export interface CanvasState {
  elements: ElementState[]
  selectedElement: number
}

const initialState: CanvasState = {
  elements: [],
  selectedElement: -1
}

export interface AddElementPayload {
  type: ElementTypes,
  props: ElementProps
}

export interface SelectElementPayload {
  id: number
}

export type MoveElementPayload = AbsolutePosition & { id: number }

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    addElement({ elements }: CanvasState, { payload }: PayloadAction<AddElementPayload>) {
      elements.push({ ...payload, top: 10, left: 10 })
    },
    moveElement({ elements }: CanvasState, { payload: { id, top, left } }: PayloadAction<MoveElementPayload>) {
      elements[id].top += top
      elements[id].left += left
    },
    selectElement(state: CanvasState, { payload: { id } }: PayloadAction<SelectElementPayload>) {
      if (id >= -1 && id < state.elements.length) {
        if (state.selectedElement !== id) {
          state.selectedElement = id
        } else {
          state.selectedElement = -1
        }
      }
    }
  }
})

export const { addElement, moveElement, selectElement } = canvasSlice.actions

export default canvasSlice.reducer
