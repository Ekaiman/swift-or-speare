import React from 'react'
import { Link }  from 'react-router-dom'
import './GameScreen.css'

const GameScreen = ({
  randomQuote,
  isItSwiftOrSpeare,
  setDisplayedQuotes,
  displaySwiftOrSpeare,
  setUserGuess,
  timer,
  isEndGame
}) => {
  return (
    <div>
      {isEndGame && (
        <div>
          <p>Oops, you cant go back!</p>
          <Link to='/'>
            <button className='home-button'>Back to Home</button>
          </Link>
        </div>
      )}
      {timer === 30 && (
        <div>
          <p>Oops! You have to start on the home screen!</p>
          <Link to='/'>
            <button className='home-button'>Back to Home</button>
          </Link>
        </div>
      )}
      {!isEndGame && timer !== 30 && (
        <div>
          <p>time left :{timer}</p>
          <p>{randomQuote}</p>
          <button
            className='swift-button'
            onClick={() => {
              setDisplayedQuotes(previous => [...previous, randomQuote])
              displaySwiftOrSpeare()
              setUserGuess(past => [...past, 'Swift'])
            }}
          >
            Swift
          </button>
          <button
            className='speare-button'
            onClick={() => {
              setDisplayedQuotes(previous => [...previous, randomQuote])
              displaySwiftOrSpeare()
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
