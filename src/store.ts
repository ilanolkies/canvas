import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'

export type RootState = ReturnType<typeof reducer>

export const createStore = () => {
  return configureStore({ reducer })
}
