import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { useAppDispatch } from '@/shared/hooks/reduxHooks'
import { addTest } from '@/app/store/knowledgeChecksSlice'

import { Question, QuestionCreationForm } from '@/components/questionCreationForm'

import s from './testCreationForm.module.scss'
import { useState } from 'react'

export type Test = {
  id: string
  testName: string
  test: Question[]
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
