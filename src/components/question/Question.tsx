import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks'
import { addAnswer } from '@/app/store/knowledgeChecksSlice'

import s from './question.module.scss'
import { areArraysEqual } from '@/shared/utils/arraysEquality'

export type QuestionType = '' | 'single' | 'multiply' | 'short' | 'detailed'

export type Question = {
  type: QuestionType
  options: string[]
  correctAnswer: string[]
  question: string
}

export type Answer = {
  answer: string[]
  isCorrect: boolean
}

export const Question = () => {
  const { id, number } = useParams()
  const { register, handleSubmit } = useForm<Answer, 'answer'>()
  const dispatch = useAppDispatch()

  const testId = id ? id : ''
  const questionNumber = number ? +number : 1

  const currentTest = useAppSelector(state => state.persistedReducer[testId])
  const currentQuestion = currentTest.test[+questionNumber - 1]
  const options = currentQuestion.options

  let inputType = ''
  switch (currentQuestion?.type) {
    case 'single':
      inputType = 'radio'
      break
    case 'multiply':
      inputType = 'checkbox'
      break
    default:
      inputType = ''
  }

  const onSubmitHandler: SubmitHandler<Pick<Answer, 'answer'>> = ({ answer }) => {
    const finalAnswer = Array.isArray(answer) ? answer : [answer]
    dispatch(
      addAnswer({
        answer: finalAnswer,
        isCorrect: areArraysEqual(finalAnswer, currentQuestion.correctAnswer),
        testId,
      })
    )
  }

  return (
    <>
      {currentQuestion ? (
        <div className={s.wrapper}>
          <h1 className={s.title}>{currentTest.testName}</h1>
          <p className={s.question}>{currentQuestion.question}</p>
          <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
            {options.length !== 0 ? (
              currentQuestion.options.map((el, i) => (
                <div key={i} className={s.inputWrapper}>
                  <input
                    id={`${i}`}
                    className={s.input}
                    {...register('answer')}
                    type={inputType}
                    value={el}
                  />
                  <label htmlFor={`${i}`} className={s.label}>
                    {el}
                  </label>
                </div>
              ))
            ) : (
              <>
                <input type="text" {...register('answer')} />
              </>
            )}
            <button type="submit">Ответить</button>
          </form>
        </div>
      ) : (
        <p>В данном тесте нет вопросов</p>
      )}
    </>
  )
}
