import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ElementTypes, ElementProps } from '../elements'
import inRange from 'lodash/inRange'
import pullAt from 'lodash/pullAt'

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

export interface ChangeElementOrderPayload {
  id: number,
  reorder: number
}

export interface SelectElementPayload {
  id: number
}

export type MoveElementPayload = AbsolutePosition & { id: number }

const elementExist = (state: CanvasState) => (id: number) => inRange(id, state.elements.length)

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
      if (elementExist(state)(id)) {
        if (state.selectedElement !== id) {
          state.selectedElement = id
        } else {
          state.selectedElement = -1
        }
      }
    },
    changeElementOrder(state: CanvasState, { payload: { id, reorder } }: PayloadAction<ChangeElementOrderPayload>) {
      const _elementExist = elementExist(state)
      const partialNewId = id + reorder
      const newId = partialNewId < 0 ? 0 : (partialNewId >= state.elements.length ? state.elements.length-1 : partialNewId)
      if (_elementExist(id) && _elementExist(newId)  && id !== newId) {
        if (newId === 0) {
          const temp = state.elements[id]
          pullAt(state.elements, [id])
          state.elements.unshift(temp)
        } else if (newId === state.elements.length - 1) {
          const temp = state.elements[id]
          pullAt(state.elements, [id])
          state.elements.push(temp)
        } else if (id > newId) {
          state.elements = [
            ...state.elements.slice(0, newId),
            state.elements[id],
            ...state.elements.slice(newId, id),
            ...state.elements.slice(id + 1)
          ]
        } else {
          state.elements = [
            ...state.elements.slice(0, id),
            ...state.elements.slice(id + 1, newId + 1),
            state.elements[id],
            ...state.elements.slice(newId + 1)
          ]
        }
        if (state.selectedElement === id) state.selectedElement = newId
      }
    },
    changeSelectedElementProp(state: CanvasState, { payload }: PayloadAction<Partial<ElementProps>>) {
      Object.assign(state.elements[state.selectedElement].props, payload)
    }
  }
})

export const { addElement, moveElement, selectElement, changeSelectedElementProp, changeElementOrder } = canvasSlice.actions

export default canvasSlice.reducer
