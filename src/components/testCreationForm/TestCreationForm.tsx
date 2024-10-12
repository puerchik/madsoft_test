import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { useAppDispatch } from '@/shared/hooks/reduxHooks'
import { addTest } from '@/app/store/knowledgeChecksSlice'

import { Question } from '@/components/questionCreationForm'

import s from './testCreationForm.module.scss'

export type Test = {
  id: string
  testName: string
  test: Question[]
}
export const TestCreationForm = () => {
  const { handleSubmit, register, reset } = useForm<Test>({
    defaultValues: {
      id: '',
      testName: '',
      test: [],
    },
  })
  const dispatch = useAppDispatch()

  const onSubmitHandler: SubmitHandler<Test> = data => {
    const testId = uuidv4()
    const newTest = {
      id: testId,
      testName: data.testName,
      test: [],
    }

    dispatch(addTest(newTest))
    reset()
  }

  return (
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
  )
}
