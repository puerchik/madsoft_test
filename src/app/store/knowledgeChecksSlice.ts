import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Question } from '@/components/questionCreationForm'
import { Test } from '@/components/testCreationForm'

type State = {
  [key: string]: Test
}

const initialTest: Test = {
  id: 'initTest',
  testName: 'Единицы измерения',
  test: [
    {
      type: 'single',
      question: 'Сколько миллиметров в сантиметре?',
      correctAnswer: ['10'],
      options: ['1', '100', '10', '1000'],
    },
  ],
}

const initialState: State = {
  initTest: initialTest,
}

export const knowledgeChecksSlice = createSlice({
  name: 'knowledgeChecks',
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<Question & { id: string }>) => {
      const newQuestion = {
        type: action.payload.type,
        question: action.payload.question,
        correctAnswer: action.payload.correctAnswer,
        options: action.payload.options,
      }

      state[action.payload.id].test.push(newQuestion)
    },
    addTest: (state, action: PayloadAction<Test>) => {
      const newTest = {
        id: action.payload.id,
        testName: action.payload.testName,
        test: action.payload.test,
      }

      state[action.payload.id] = newTest
    },
  },
})

export const knowledgeChecksReducer = knowledgeChecksSlice.reducer
export const { addQuestion, addTest } = knowledgeChecksSlice.actions
