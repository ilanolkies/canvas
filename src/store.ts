import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'

export type RootState = ReturnType<typeof reducer>

const middleware: any[] = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middleware.push(logger);
}

export const createStore = () => {
  return configureStore({ reducer, middleware })
}
