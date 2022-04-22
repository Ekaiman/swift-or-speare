// import logo from './logo.svg'
import './App.css'
import React, { useEffect, useState } from 'react'
import apiCalls from '../../apiCalls'
import { Route, Switch, Link } from 'react-router-dom'
import GameScreen from '../GameScreen/GameScreen'
import EndGame from '../End Game/EndGame'

function App() {
  var myInterval

  //>>>>>>>>>>>>STATE<<<<<<<<<<<<<<
  const [timer, setTimer] = useState(30)
  const [endGame, setEndGame] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [randomQuote, setRandomQuote] = useState('')
  const [isItSwift, setIsitSwift] = useState()
  const [displayedQuotes, setDisplayedQuotes] = useState([])
  const [guess, setGuess] = useState([])
  const [taylorSwift, setTaylorSwift] = useState([])
  const [shakeSpeare, setShakeSpeare] = useState([
    'Love all, trust a few, do wrong to none.',
    'Love looks not with the eyes, but with the mind.',
    'Be not afraid of greatness. Some are born great, some achieve greatness, and others have greatness thrust upon them.',
    'There is nothing either good or bad, but thinking makes it so.',
    'Hell is empty and all the devils are here.',
    'We know what we are, but not what we may be.',
    'You speak an infinite deal of nothing.',
    'The course of true love never did run smooth.',
    "Don't waste your love on somebody, who doesn't value it.",
    'Expectation is the root of all heartache.',
    'Listen to many, speak to a few.',
    'One may smile, and smile, and be a villain.',
    "What's done cannot be undone.",
    'All the worlds a stage, and all the men and women merely players. They have their exits and their entrances; and one man in his time plays many parts.',
    'All that glisters is not gold.',
    'I like this place and could willingly waste my time in it.'
  ])

  //>>>>>>>USEEFECT>><<<<<<<<<<<<
  useEffect(() => {
    apiCalls
      .fetchData('https://taylorswiftapi.herokuapp.com/get-all?album=fearless')
      .then(data => setTaylorSwift(data))
  }, [])

  useEffect(() => {
    if (timer <= 0) {
      setEndGame(true)
  
    }
  }, [timer])

  useEffect(() => {
    if (!endGame && isGameStarted) {
      const interval = setInterval(() => {
        let newTime = timer - +1
        setTimer(previousTime => previousTime - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [endGame, isGameStarted])

  const swiftOrSpeare = () => {
    let swift = 0
    let speare = 0
    swift = Math.floor(Math.random() * 10)
    speare = Math.floor(Math.random() * 10)
    if (swift > speare) {
      let index = Math.floor(Math.random() * 20)
      console.log(index)
      console.log(taylorSwift)
      setRandomQuote(taylorSwift[index].quote)
      setIsitSwift(true)
      console.log(taylorSwift[index].quote)
      cleanQuote(index)
    } else {
      let index = Math.floor(Math.random() * shakeSpeare.length)
      setRandomQuote(shakeSpeare[index])
      setIsitSwift(false)
      console.log(shakeSpeare[index])
      console.log(swift, speare)
    }
  }

  const cleanQuote = index => {
    if (taylorSwift[index].quote.includes('/')) {
      let cleaned = taylorSwift[index].quote.replace(/\//g, '')
      setRandomQuote(cleaned)
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>swift or speare</header>
      <Switch>
        <Route exact path='/game-begin'>
          <GameScreen
            randomQuote={randomQuote}
            isItSwift={isItSwift}
            setDisplayedQuotes={setDisplayedQuotes}
            swiftOrSpeare={swiftOrSpeare}
            setGuess={setGuess}
          />
        </Route>
        <Route exact path='/'>
          <button
            onClick={() => {
              console.log('hi')
              setTimer(10)
            }}
          >
            10 seconds
          </button>
          <button onClick={() => setTimer(20)}>20 seconds</button>
          <button onClick={() => setTimer(30)}>30 seconds</button>
          <Link to='/game-begin'>
            <button
              onClick={() => {
                swiftOrSpeare()
                setIsGameStarted(true)
              }}
            >
              Start Game
            </button>
          </Link>
        </Route>
        <Route to='game-over'>
          <EndGame myInterval={myInterval} clearInterval={clearInterval} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
