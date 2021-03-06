import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const EndGame = ({
  userGuess,
  isItSwiftOrSpeare,
  displayedQuotes,
  setIsGameStarted,
  ranOutOfQuotes,
  isEndGame
}) => {
  const [numberCorrect, setNumberCorrect] = useState(0)

  useEffect(() => {
    if (isEndGame) {
      for (var i = 0; i < userGuess.length; i++) {
        if (userGuess[i] === isItSwiftOrSpeare[i]) {
          setNumberCorrect(previous => previous + 1)
        }
      }
    }
  }, [isEndGame])

  return (
    <div>
      {isEndGame ? (
        <div>
          <h1 className='game-over'> Game over!</h1>
          {ranOutOfQuotes && <p>You're too good! We ran out of quotes.</p>}
          <h3>
            You got {numberCorrect}/{userGuess.length} correct!
          </h3>
          <Link to='/'>
            <button
              className='home-button'
              onClick={() => setIsGameStarted(false)}
            >
              Play Again!
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <p>Lets Play!</p>
          <Link to='/'>
            <button className='home-button'npm >Home</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default EndGame
