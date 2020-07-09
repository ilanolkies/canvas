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
  elements: ElementState[],
}

const initialState: CanvasState = {
  elements: []
}

export interface AddElementPayload {
  type: ElementTypes,
  props: ElementProps
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
    }
  }
})

export const { addElement, moveElement } = canvasSlice.actions

export default canvasSlice.reducer
