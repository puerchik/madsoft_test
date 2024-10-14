import { useState, useEffect } from 'react'

type Props = {
  minutes: number
  seconds: number
  onSubmitTimerHandler: () => void
}

export const Timer = ({ minutes, seconds, onSubmitTimerHandler }: Props) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds)

  useEffect(() => {
    const intervalId: ReturnType<typeof setTimeout> = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeLeft(seconds)

      onSubmitTimerHandler()
    }
  }, [timeLeft, onSubmitTimerHandler, seconds])

  return (
    <div>
      <h2>Отсчет времени:</h2>
      <p>{timeLeft} секунд</p>
    </div>
  )
}
