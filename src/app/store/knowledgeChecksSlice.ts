import { Question } from '@/components/questionCreationForm'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type State = Question[]

const initialState: State = [
  {
    type: 'single',
    question: 'Сколько миллиметров в сантиметре?',
    correctAnswer: ['10'],
    options: ['1', '100', '10', '1000'],
  },
]

export const knowledgeChecksSlice = createSlice({
  name: 'knowledgeChecks',
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<Question>) => {
      const question = {
        type: action.payload.type,
        question: action.payload.question,
        correctAnswer: action.payload.correctAnswer,
        options: action.payload.options,
      }

      state.push(question)
    },
  },
})

export const knowledgeChecksReducer = knowledgeChecksSlice.reducer
export const { addQuestion } = knowledgeChecksSlice.actions
