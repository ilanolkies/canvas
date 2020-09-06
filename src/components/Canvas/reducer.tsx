import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ElementTypes, ElementProps } from '../elements'
import inRange from 'lodash/inRange'
import pullAt from 'lodash/pullAt'
import { listenerCount } from 'cluster'

export interface AbsolutePosition {
  top: number,
  left: number,
}

export interface ElementState extends AbsolutePosition {
  type: ElementTypes,
  props: ElementProps,
  id: number
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

export type MoveElementPayload = AbsolutePosition & { at: number }

export interface ChangeElementOrderPayload {
  at: number,
  reorder: number
}

export interface SelectElementPayload {
  at: number
}

const elementExist = (state: CanvasState) => (id: number) => inRange(id, state.elements.length)

let idCount = 0

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    addElement({ elements }: CanvasState, { payload }: PayloadAction<AddElementPayload>) {
      elements.push({ ...payload, top: 10, left: 10, id: idCount++ })
    },
    moveElement({ elements }: CanvasState, { payload: { at, top, left } }: PayloadAction<MoveElementPayload>) {
      elements[at].top += top
      elements[at].left += left
    },
    selectElement(state: CanvasState, { payload: { at } }: PayloadAction<SelectElementPayload>) {
      if (elementExist(state)(at)) {
        if (state.selectedElement !== at) {
          state.selectedElement = at
        } else {
          state.selectedElement = -1
        }
      }
    },
    changeElementOrder(state: CanvasState, { payload: { at, reorder } }: PayloadAction<ChangeElementOrderPayload>) {
      const _elementExist = elementExist(state)
      const partialNewAt = at + reorder
      const newAt = partialNewAt < 0 ? 0 : (partialNewAt >= state.elements.length ? state.elements.length-1 : partialNewAt)
      if (_elementExist(at) && _elementExist(newAt)  && at !== newAt) {
        if (newAt === 0) {
          const temp = state.elements[at]
          pullAt(state.elements, [at])
          state.elements.unshift(temp)
        } else if (newAt === state.elements.length - 1) {
          const temp = state.elements[at]
          pullAt(state.elements, [at])
          state.elements.push(temp)
        } else if (at > newAt) {
          state.elements = [
            ...state.elements.slice(0, newAt),
            state.elements[at],
            ...state.elements.slice(newAt, at),
            ...state.elements.slice(at + 1)
          ]
        } else {
          state.elements = [
            ...state.elements.slice(0, at),
            ...state.elements.slice(at + 1, newAt + 1),
            state.elements[at],
            ...state.elements.slice(newAt + 1)
          ]
        }
        if (state.selectedElement === at) state.selectedElement = newAt
      }
    },
    changeSelectedElementProp(state: CanvasState, { payload }: PayloadAction<Partial<ElementProps>>) {
      Object.assign(state.elements[state.selectedElement].props, payload)
    }
  }
})

export const { addElement, moveElement, selectElement, changeSelectedElementProp, changeElementOrder } = canvasSlice.actions

export default canvasSlice.reducer
