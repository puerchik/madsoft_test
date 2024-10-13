import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { addTest } from '@/app/store/knowledgeChecksSlice'
import { useAppDispatch } from '@/shared/hooks/reduxHooks'

import { QuestionCreationForm } from '@/components/questionCreationForm'
import { Answer, Question } from '@/components/question'

import s from './testCreationForm.module.scss'

export type Test = {
  id: string
  testName: string
  test: Question[]
  answers: Answer[]
  currentQuestionNumber: number
}
export const TestCreationForm = () => {
  const [testId, setTestId] = useState('')
  const { handleSubmit, register, reset } = useForm<Test>({
    defaultValues: {
      id: '',
      testName: '',
      test: [],
    },
  })
  const dispatch = useAppDispatch()

  const onSubmitHandler: SubmitHandler<Test> = data => {
    const newTestId = uuidv4()
    const newTest = {
      id: newTestId,
      testName: data.testName,
      test: [],
      answers: [],
      currentQuestionNumber: 1,
    }

    setTestId(newTestId)
    dispatch(addTest(newTest))
    reset()
  }

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <div className={s.testNameInputWrapper}>
          <label htmlFor="testName">Введите имя теста</label>
          <input
            {...register('testName')}
            id="testName"
            type="text"
            placeholder="Введите имя теста"
          />
        </div>
        <button type="submit">Создать тест</button>
      </form>
      {!!testId && <QuestionCreationForm id={testId} />}
    </>
  )
}
