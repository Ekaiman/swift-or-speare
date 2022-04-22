// import logo from './logo.svg'
import './App.css'
import React, { useEffect, useState } from 'react'
import apiCalls from '../../apiCalls'
import { Route, Routes, Switch, Link, useNavigate } from 'react-router-dom'
import GameScreen from '../GameScreen/GameScreen'
import EndGame from '../End Game/EndGame'
import shakeSpeareQuotes from '../../shakeSpearData'

function App() {
  //>>>>>>>>>>>>STATE<<<<<<<<<<<<<<
  const [timer, setTimer] = useState(30)
  const [isEndGame, setIsEndGame] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [randomQuote, setRandomQuote] = useState('')
  const [isItSwiftOrSpeare, setIsitSwiftOrSpeare] = useState([])
  const [displayedQuotes, setDisplayedQuotes] = useState([])
  const [userGuess, setUserGuess] = useState([])
  const [taylorSwift, setTaylorSwift] = useState([])
  const [shakeSpeare, setShakeSpeare] = useState(shakeSpeareQuotes)

  //>>>>>>>USEEFECT>><<<<<<<<<<<<
  useEffect(() => {
    apiCalls
      .fetchData('https://taylorswiftapi.herokuapp.com/get-all?album=fearless')
      .then(data => setTaylorSwift(data))
    }, [])
    
    useEffect(() => {
      if (!isGameStarted) {
      setTimer(30)
      setIsEndGame(false)
      setIsGameStarted(false)
      setUserGuess([])
      setDisplayedQuotes([])
      setIsitSwiftOrSpeare([])
      
    }
   }, [isGameStarted])

  useEffect(() => {
    if (timer <= 0) {
      setIsEndGame(true)
    }
  }, [timer])

  useEffect(() => {
    if (!isEndGame && isGameStarted) {
      const interval = setInterval(() => {
        let newTime = timer - +1
        setTimer(previousTime => previousTime - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isEndGame, isGameStarted])

  const navigate = useNavigate()

  useEffect(() => {
    const endGamePage = () => navigate('/game-over')
    if (isEndGame) {
      endGamePage()
    }
  }, [isEndGame])

  const swiftOrSpeare = () => {
    let swift = Math.floor(Math.random() * 10)
    let speare = Math.floor(Math.random() * 10)
    if (swift > speare) {
      let index = Math.floor(Math.random() * 20)
      setRandomQuote(taylorSwift[index].quote)
      setIsitSwiftOrSpeare(past => [...past, 'Swift'])
      cleanQuote(index)
    } else {
      let index = Math.floor(Math.random() * shakeSpeare.length)
      setRandomQuote(shakeSpeare[index])
      setIsitSwiftOrSpeare(past => [...past, 'Speare'])
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
      <Routes>
        <Route
          exact
          path='/game-begin'
          element={
            <GameScreen
              randomQuote={randomQuote}
              isItSwiftOrSpeare={isItSwiftOrSpeare}
              setDisplayedQuotes={setDisplayedQuotes}
              swiftOrSpeare={swiftOrSpeare}
              setUserGuess={setUserGuess}
            />
          }
        />
        <Route
          exact
          path='/'
          element={
            <div>
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
            </div>
          }
        />
        <Route
          exact
          path='/game-over'
          element={
            <EndGame
              displayedQuotes={displayedQuotes}
              isItSwiftOrSpeare={isItSwiftOrSpeare}
              userGuess={userGuess}
              setIsGameStarted={setIsGameStarted}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
