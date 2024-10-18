import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { addTest } from '@/app/store/knowledgeChecksSlice'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks'

import { QuestionCreationForm } from '@/components/questionCreationForm'
import { Answer, Question } from '@/components/question'
import { Button } from '@/components/button'

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
  const questions = useAppSelector(state => state.persistedReducer[testId]?.test)
  const { handleSubmit, register, reset } = useForm<Test>({
    defaultValues: {
      id: '',
      testName: '',
      test: [],
    },
  })
  const dispatch = useAppDispatch()

  console.log(questions)

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
      {!testId && (
        <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <div className={s.testNameInputWrapper}>
            <label htmlFor="testName">Введите имя теста</label>
            <input
              className={s.input}
              {...register('testName')}
              id="testName"
              type="text"
              placeholder="Введите имя теста"
            />
          </div>
          <Button type="submit">Создать тест</Button>
        </form>
      )}
      {!!testId && (
        <div className={s.questionsCreationWrapper}>
          <QuestionCreationForm id={testId} />
          <div className={s.questionsListWrapper}>
            <h3 className={s.questionsListTitle}>Список вопросов:</h3>
            <ul className={s.questionsList}>
              {questions?.map((el, i) => (
                <li key={i} className={s.question}>
                  <p>
                    Вопрос №{i + 1}: {el.question}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
