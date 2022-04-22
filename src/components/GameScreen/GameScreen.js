import React from 'react'
import reactRouterDom from 'react-router-dom'

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
        onClick={() => {
          setDisplayedQuotes(previous => [...previous, randomQuote])
          swiftOrSpeare()
          setUserGuess(past => [...past, 'Swift'])
        }}
      >
        Swift
      </button>
      <button
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
