import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import clsx from 'clsx'

import { useAppDispatch } from '@/shared/hooks/reduxHooks'
import { addQuestion } from '@/app/store/knowledgeChecksSlice'

import { Question, QuestionType } from '@/components/question'
import { Button } from '@/components/button'

import s from './questionCreationForm.module.scss'

type Props = {
  id: string
}

export const QuestionCreationForm = ({ id }: Props) => {
  const [questionType, setQuestionType] = useState<QuestionType>('')
  const [options, setOptions] = useState<string[]>([])
  const [optionsQuantity, setOptionsQuantity] = useState<number | undefined>(undefined)

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
    if (quantity > 0 && quantity < 10) {
      setOptionsQuantity(quantity)
      setOptions(Array(quantity).fill(''))
    }
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
      <select
        required
        className={s.select}
        {...register('type')}
        onChange={changeQuestionTypeHandler}
      >
        <option value="">Выберите тип вопроса</option>
        <option value="single">выбор одного варианта</option>
        <option value="multiply">выбор нескольких вариантов</option>
        <option value="short">короткий ответ</option>
        <option value="detailed">развернутый ответ</option>
      </select>
      {questionType !== '' && (
        <div className={s.inputWrapper}>
          <label className={s.label} htmlFor="questionInputWrapper">
            Введите вопрос
          </label>
          <input
            required
            id="questionInputWrapper"
            className={s.input}
            {...register('question')}
            type="text"
            placeholder="Введите вопрос"
          />
        </div>
      )}
      {(questionType === 'single' || questionType === 'multiply') && (
        <div className={s.optionsWrapper}>
          <div className={s.inputWrapper}>
            <label className={s.label} htmlFor="optionsQuantity">
              Введите количество вариантов ответа
            </label>
            <input
              className={s.input}
              required
              type="number"
              onChange={changeOptionsQuantityHandler}
              placeholder="Введите количество вариантов ответа"
              value={optionsQuantity}
              id="optionsQuantity"
            />
          </div>
          <div className={s.optionsSelectWrapper}>
            <div className={clsx(s.inputWrapper, s.optionsInputWrapper)}>
              {options.map((_, i) => (
                <div key={i} className={s.optionWrapper}>
                  <label htmlFor={`option${i}`}>Вариант ответа №{i + 1}</label>
                  <input
                    id={`option${i}`}
                    className={s.input}
                    {...register(`options.${i}`)}
                    onChange={e => changeOptionHandler(e, i)}
                    type="text"
                    placeholder="Введите вариант ответа"
                  />
                </div>
              ))}
            </div>
            {options.length > 1 && (
              <select
                className={s.correctAnswerSelect}
                multiple={questionType === 'multiply'}
                {...register('correctAnswer')}
              >
                <option value="">Выберите правильный ответ/ответы</option>
                {options.map((el, i) => (
                  <option key={i} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      )}
      {questionType === 'short' && (
        <div className={s.inputWrapper}>
          <label className={s.label} htmlFor="short">
            Введите ответ
          </label>
          <input
            id="short"
            className={s.input}
            {...register('correctAnswer')}
            type="text"
            placeholder="Введите ответ"
          />
        </div>
      )}
      {questionType === 'detailed' && (
        <p>
          Данный вопрос предполагает проверку человеком, поэтому вариантов ответа не предусмотрено.
        </p>
      )}
      <Button type="submit">Создать вопрос</Button>
    </form>
  )
}
