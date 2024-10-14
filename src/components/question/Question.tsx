import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks'
import { addAnswer } from '@/app/store/knowledgeChecksSlice'
import { areArraysEqual } from '@/shared/utils/arraysEquality'

import { Timer } from '@/components/timer'

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
  const nextQuestionTimer = useAppSelector(
    state =>
      state.persistedReducer[testId].test[
        questionNumber === currentTest.test.length || questionNumber === 1
          ? +questionNumber - 1
          : +questionNumber
      ].timer
  )
  const currentQuestionNumber = useAppSelector(
    state => state.persistedReducer[testId].currentQuestionNumber
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
    console.log(answer, Array.isArray(answer), finalAnswer)

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

  console.log(nextQuestionTimer)

  return (
    <>
      {currentQuestion ? (
        <div className={s.wrapper}>
          <Timer
            minutes={0}
            seconds={nextQuestionTimer}
            onSubmitTimerHandler={handleSubmit(onSubmitHandler)}
          />
          <h1 className={s.title}>{currentTest.testName}</h1>
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
            <button type="submit">Ответить</button>
          </form>
        </div>
      ) : (
        <p>В данном тесте нет вопросов</p>
      )}
    </>
  )
}
