import React from 'react'
import reactRouterDom from 'react-router-dom'
import './GameScreen.css'

const GameScreen = ({
  randomQuote,
  isItSwiftOrSpeare,
  setDisplayedQuotes,
  swiftOrSpeare,
  setUserGuess
}) => {
  return (
    <div>
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
      <button className='speare-button'
        onClick={() => {
          setDisplayedQuotes(previous => [...previous, randomQuote])
          swiftOrSpeare()
          setUserGuess(past => [...past, 'Speare'])
        }}
      >
        Speare
      </button>
    </div>
  )
}

export default GameScreen
