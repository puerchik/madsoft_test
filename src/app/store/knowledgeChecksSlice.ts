import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Answer, Question } from '@/components/question'
import { Test } from '@/components/testCreationForm'

type State = {
  [key: string]: Test
}

const initialTest: Test = {
  id: 'initTest',
  testName: 'Пример теста',
  answers: [],
  currentQuestionNumber: 1,
  test: [
    {
      type: 'single',
      question: 'Сколько миллиметров в сантиметре?',
      correctAnswer: ['10'],
      options: ['1', '100', '10', '1000'],
      timer: 900,
    },
    {
      type: 'short',
      question: 'Столица Португалии?',
      correctAnswer: ['Лиссабон'],
      options: [],
      timer: 900,
    },
    {
      type: 'single',
      question: 'Какая самая длинная река в мире?',
      correctAnswer: ['Нил'],
      options: ['Янцзы', 'Енисей', 'Нил', 'Юкон'],
      timer: 900,
    },
    {
      type: 'short',
      question: 'Как называется дом, сделанный полностью изо льда?',
      correctAnswer: ['иглу'],
      options: [],
      timer: 900,
    },
    {
      type: 'multiply',
      question: 'Выберите четные числа.',
      correctAnswer: ['10', '88'],
      options: ['5', '10', '37', '88'],
      timer: 900,
    },

    {
      type: 'short',
      question: 'Столица Беларуси?',
      correctAnswer: ['Минск'],
      options: [],
      timer: 900,
    },
    {
      type: 'detailed',
      question: 'Напишите своими словами алгоритм бинарного поиска.',
      correctAnswer: [],
      options: [],
      timer: 4,
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
        timer: action.payload.timer,
      }

      state[action.payload.id].test.push(newQuestion)
    },
    addTest: (state, action: PayloadAction<Test>) => {
      const newTest = {
        id: action.payload.id,
        testName: action.payload.testName,
        test: action.payload.test,
        answers: action.payload.answers,
        currentQuestionNumber: 1,
      }

      state[action.payload.id] = newTest
    },
    addAnswer: (state, action: PayloadAction<Answer & { testId: string }>) => {
      const answer: Answer = {
        answer: action.payload.answer,
        isCorrect: action.payload.isCorrect,
      }

      state[action.payload.testId].answers.push(answer)

      if (
        state[action.payload.testId].test.length !==
        state[action.payload.testId].currentQuestionNumber
      ) {
        state[action.payload.testId].currentQuestionNumber++
      }
    },
    resetTest: (state, action: PayloadAction<{ testId: string }>) => {
      state[action.payload.testId].answers = []
      state[action.payload.testId].currentQuestionNumber = 1
    },
  },
})

export const knowledgeChecksReducer = knowledgeChecksSlice.reducer
export const { addQuestion, addTest, addAnswer, resetTest } = knowledgeChecksSlice.actions
