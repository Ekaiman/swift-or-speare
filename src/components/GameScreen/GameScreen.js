import React from 'react'
import reactRouterDom from 'react-router-dom'

const GameScreen = ({
  randomQuote,
  isItSwift,
  setDisplayedQuotes,
  swiftOrSpeare,
  setGuess
}) => {
  return (
    <div>
      <p>{randomQuote}</p>
      <button
        onClick={() => {
          setDisplayedQuotes(previous => [...previous, randomQuote])
          swiftOrSpeare()
          setGuess(past => [...past, 'Swift'])
        }}
      >
        Swift
      </button>
      <button
        onClick={() => {
          setDisplayedQuotes(previous => [...previous, randomQuote])
          swiftOrSpeare()
          setGuess(past => [...past, 'Speare'])
        }}
      >
        Speare
      </button>
    </div>
  )
}

export default GameScreen
