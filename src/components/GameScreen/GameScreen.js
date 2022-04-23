import React from 'react'
import { Link }  from 'react-router-dom'
import './GameScreen.css'

const GameScreen = ({
  randomQuote,
  isItSwiftOrSpeare,
  setDisplayedQuotes,
  swiftOrSpeare,
  setUserGuess,
  timer,
  isEndGame
}) => {
  return (
    <div>
      {isEndGame && (
        <div>
          <p>Oops! Lets try again!</p>
          <Link to='/'>
          <button>Back to Home</button>
          </Link>
        </div>
      )}
      {!isEndGame && (
        <div>
          <p>time left :{timer}</p>
          <p>{randomQuote}</p>
          <button
            className='swift-button'
            onClick={() => {
              setDisplayedQuotes(previous => [...previous, randomQuote])
              swiftOrSpeare()
              setUserGuess(past => [...past, 'Swift'])
            }}
          >
            Swift
          </button>
          <button
            className='speare-button'
            onClick={() => {
              setDisplayedQuotes(previous => [...previous, randomQuote])
              swiftOrSpeare()
              setUserGuess(past => [...past, 'Speare'])
            }}
          >
            Speare
          </button>
        </div>
      )}
    </div>
  )
}

export default GameScreen
