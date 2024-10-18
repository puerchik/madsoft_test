import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Countdown, { zeroPad } from 'react-countdown'
import clsx from 'clsx'

import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks'
import { addAnswer } from '@/app/store/knowledgeChecksSlice'
import { areArraysEqual } from '@/shared/utils/arraysEquality'

import { Button } from '@/components/button'

import s from './question.module.scss'

export type QuestionType = '' | 'single' | 'multiply' | 'short' | 'detailed'

export type Question = {
  type: QuestionType
  options: string[]
  correctAnswer: string[]
  question: string
  timer: number
}

export type Answer = {
  answer: string[]
  isCorrect: boolean
}

export const Question = () => {
  const { id, number } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm<Pick<Answer, 'answer'>>({
    defaultValues: {
      answer: [''],
    },
  })
  const dispatch = useAppDispatch()

  const testId = id ? id : ''
  const questionNumber = number ? +number : 1

  const currentTest = useAppSelector(state => state.persistedReducer[testId])
  const currentQuestion = useAppSelector(
    state => state.persistedReducer[testId].test[+questionNumber - 1]
  )

  const currentQuestionNumber = useAppSelector(
    state => state.persistedReducer[testId].currentQuestionNumber
  )
  console.log(currentQuestionNumber)

  const questionTimer = useAppSelector(
    state =>
      state.persistedReducer[testId].test[
        currentQuestionNumber <= currentTest.test.length ? +currentQuestionNumber - 1 : 0
      ].timer
  )

  const options = useAppSelector(
    state => state.persistedReducer[testId].test[+questionNumber - 1].options
  )

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
        isCorrect:
          currentQuestion.type === 'detailed'
            ? true
            : areArraysEqual(finalAnswer, currentQuestion.correctAnswer),
        testId,
      })
    )

    if (currentQuestionNumber === currentTest.test.length) {
      navigate(`/test/${testId}/result`)
    } else {
      navigate(`/test/${testId}/${currentQuestionNumber + 1}`)
    }
    reset()
  }

  return (
    <>
      {currentQuestion ? (
        <div className={s.wrapper}>
          <div className={s.titleWrapper}>
            <h1 className={s.title}>{currentTest.testName}</h1>
            {questionTimer && (
              <Countdown
                key={questionNumber}
                date={Date.now() + questionTimer * 1000}
                onComplete={handleSubmit(onSubmitHandler)}
                autoStart
                renderer={({ minutes, seconds }) => (
                  <div className={s.timer}>
                    <span>
                      {zeroPad(minutes)}:{zeroPad(seconds)}
                    </span>
                  </div>
                )}
              />
            )}
          </div>
          <div className={s.testProgressBar}>
            {currentTest.test.map((_, i) => {
              return (
                <div
                  key={i}
                  className={clsx(
                    s.testProgressItem,
                    i === currentQuestionNumber - 1 && s.testProgressCurrentItem,
                    i < currentQuestionNumber - 1 && s.testProgressDoneItem
                  )}
                ></div>
              )
            })}
          </div>
          <p className={s.question}>{currentQuestion.question}</p>
          <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
            {options.length !== 0 ? (
              options.map((el, i) => (
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
                {currentQuestion.type === 'short' ? (
                  <input type="text" {...register('answer')} />
                ) : (
                  <textarea {...register('answer')}></textarea>
                )}
              </>
            )}
            <Button classNames={s.submitButton} type="submit">
              Ответить
            </Button>
          </form>
        </div>
      ) : (
        <p>В данном тесте нет вопросов</p>
      )}
    </>
  )
}
