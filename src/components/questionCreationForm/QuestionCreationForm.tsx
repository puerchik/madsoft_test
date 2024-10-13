import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch } from '@/shared/hooks/reduxHooks'
import { addQuestion } from '@/app/store/knowledgeChecksSlice'

import s from './questionCreationForm.module.scss'

type Props = {
  id: string
}

export type QuestionType = '' | 'single' | 'multiply' | 'short' | 'detailed'

export type Question = {
  type: QuestionType
  options: string[]
  correctAnswer: string[]
  question: string
}

export const QuestionCreationForm = ({ id }: Props) => {
  const [questionType, setQuestionType] = useState<QuestionType>('')
  const [options, setOptions] = useState<string[]>([])
  const [optionsQuantity, setOptionsQuantity] = useState(0)

  const { register, handleSubmit, reset } = useForm<Question>({
    defaultValues: {
      options: [],
      type: '',
      correctAnswer: [],
      question: '',
    },
  })

  const dispatch = useAppDispatch()

  const changeQuestionTypeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuestionType(e.currentTarget.value as QuestionType)
    setOptionsQuantity(0)
    setOptions([])
  }

  const changeOptionsQuantityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const quantity = +e.currentTarget.value
    setOptionsQuantity(quantity)
    setOptions(Array(quantity).fill(''))
  }

  const changeOptionHandler = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const newOptions = [...options]
    newOptions[i] = e.currentTarget.value
    setOptions(newOptions)
  }

  const onSubmitHandler: SubmitHandler<Question> = data => {
    const question = { ...data, id }
    dispatch(addQuestion(question))
    setOptionsQuantity(0)
    setOptions([])
    reset()
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
      <select {...register('type')} onChange={changeQuestionTypeHandler}>
        <option value="">Выберите тип вопроса</option>
        <option value="single">выбор одного варианта</option>
        <option value="multiply">выбор нескольких вариантов</option>
        <option value="short">короткий ответ</option>
        <option value="detailed">развернутый ответ</option>
      </select>
      {questionType !== '' && (
        <input {...register('question')} type="text" placeholder="Введите вопрос" />
      )}
      {(questionType === 'single' || questionType === 'multiply') && (
        <div>
          <div>
            <label htmlFor="optionsQuantity">Введите количество вариантов ответа</label>
            <input
              onChange={changeOptionsQuantityHandler}
              type="number"
              placeholder="Введите количество вариантов ответа"
              value={optionsQuantity}
              id="optionsQuantity"
            />
          </div>

          {options.map((_, i) => (
            <input
              {...register(`options.${i}`)}
              onChange={e => changeOptionHandler(e, i)}
              type="text"
              key={i}
              placeholder="Введите вариант ответа"
            />
          ))}
          {options.length > 1 && (
            <select multiple={questionType === 'multiply'} {...register('correctAnswer')}>
              <option value="">Select the correct answer</option>
              {options.map((el, i) => (
                <option key={i} value={el}>
                  {el}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
      {(questionType === 'short' || questionType === 'detailed') && (
        <input {...register('correctAnswer')} type="text" placeholder="Введите ответ" />
      )}
      <button type="submit">Создать вопрос</button>
    </form>
  )
}
