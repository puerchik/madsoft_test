import { configureStore } from '@reduxjs/toolkit'
import { knowledgeChecksReducer } from './knowledgeChecksSlice'

export const store = configureStore({
  reducer: {
    knowledgeChecksReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
