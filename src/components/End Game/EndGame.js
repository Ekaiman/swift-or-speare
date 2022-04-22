import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const EndGame = ({ userGuess, isItSwiftOrSpeare, displayedQuotes, setIsGameStarted }) => {
  const [numberCorrect, setNumberCorrect] = useState(0)

  useEffect(() => {
    for (var i = 0; i < userGuess.length; i++) {
      if (userGuess[i] === isItSwiftOrSpeare[i]) {
        setNumberCorrect(previous => previous + 1)
      }
    }
  }, [])

  return (
    <div>
      <h1> Game over!</h1>
      <h1>HERES MORE THINGS</h1>
      <h3>
        you got {numberCorrect}/{userGuess.length} correct!
      </h3>
      <Link to="/">
        <button onClick={() => setIsGameStarted(false)}>Play Again!</button>
      </Link>
    </div>
  )
}

export default EndGame
