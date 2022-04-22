// import logo from './logo.svg'
import './App.css'
import React, { useEffect, useState } from 'react'
import apiCalls from '../../apiCalls'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import GameScreen from '../GameScreen/GameScreen'
import EndGame from '../End Game/EndGame'
import shakeSpeareQuotes from '../../shakeSpearData'

function App() {
  //>>>>>>>>>>>>STATE<<<<<<<<<<<<<<
  const [timer, setTimer] = useState(30)
  const [isTimeSelected, setIsTimeSelected] = useState(false)
  const [isEndGame, setIsEndGame] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [randomQuote, setRandomQuote] = useState('')
  // const [usedSwiftIndex, setUsedSwiftIndex] = useState([])
  // const [usedSpeareIndex, setUsedSpeareIndex] = useState([])
  const [isItSwiftOrSpeare, setIsitSwiftOrSpeare] = useState([])
  const [displayedQuotes, setDisplayedQuotes] = useState([])
  const [userGuess, setUserGuess] = useState([])
  const [taylorSwift, setTaylorSwift] = useState([])
  const [taylorSwiftUsableQuotes, setTaylorSwiftUsableQuotes] = useState([])
  const [speareUsableQuotes, setSpeareUsableQuotes] = useState([
    ...shakeSpeareQuotes
  ])
  const [shakeSpeare, setShakeSpeare] = useState(shakeSpeareQuotes)

  //>>>>>>>USEEFECT>><<<<<<<<<<<<
  useEffect(() => {
    apiCalls
      .fetchData('https://taylorswiftapi.herokuapp.com/get-all?album=fearless')
      .then(data => {
        setTaylorSwift(data)
      })
  }, [])

  useEffect(() => {
    if (!isGameStarted) {
      let cleanedQuotes = []
      taylorSwift.forEach(tquote => {
        if (tquote.quote.includes('/')) {
          let cleaned = tquote.quote.replace(/\//g, '')
          cleanedQuotes.push(cleaned)
        } else {
          cleanedQuotes.push(tquote.quote)
        }
      })
      setTaylorSwiftUsableQuotes([...cleanedQuotes])
    }
  }, [taylorSwift, isGameStarted])

  useEffect(() => {
    if (!isGameStarted) {
      setTimer(30)
      setIsTimeSelected(false)
      setIsEndGame(false)
      setIsGameStarted(false)
      setUserGuess([])
      setDisplayedQuotes([])
      setIsitSwiftOrSpeare([])
      setSpeareUsableQuotes([...shakeSpeare])
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
    let swift = getRandomNumber(10)
    let speare = getRandomNumber(10)
    let randomSelectedQuote
    if (swift > speare) {
      let index = getRandomNumber(taylorSwiftUsableQuotes.length)
      // randomSelectedQuote = taylorSwiftUsableQuotes[index]
      setRandomQuote(taylorSwiftUsableQuotes[index])
      setIsitSwiftOrSpeare(past => [...past, 'Swift'])
      // cleanQuote(index)
      // console.log(randomSelectedQuote)
      // if (index) {

      taylorSwiftUsableQuotes.splice(index, 1)
      // console.log(taylorSwiftUsableQuotes)
      // console.log(taylorSwift)
      // setTaylorSwiftUsableQuotes(newQuotes)
      // }
    } else {
      let index = getRandomNumber(speareUsableQuotes.length)
      setRandomQuote(speareUsableQuotes[index])
      setIsitSwiftOrSpeare(past => [...past, 'Speare'])
      speareUsableQuotes.splice(index, 1)
    }
  }

  const getRandomNumber = length => {
    let index = Math.floor(Math.random() * length)
    return index
  }

  // const cleanQuote = index => {
  //   if (taylorSwift[index].quote.includes('/')) {
  //     let cleaned = taylorSwift[index].quote.replace(/\//g, '')
  //     setRandomQuote(cleaned)
  //   }
  // }

  return (
    <div className='App'>
      <h1 className='App-header'>swift or speare</h1>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <div>
              <h3>Select your time</h3>
              <div className='e-btn-group'>
                <input
                  type='radio'
                  id='radioleft'
                  name='align'
                  value='left'
                  onClick={() => {
                    setIsTimeSelected(true)
                    setTimer(10)
                  }}
                />
                <label className='e-btn' for='radioleft'>
                  10 Seconds
                </label>
                <input
                  type='radio'
                  id='radiomiddle'
                  name='align'
                  value='middle'
                  onClick={() => {
                    setIsTimeSelected(true)
                    setTimer(15)
                  }}
                />
                <label className='e-btn' for='radiomiddle'>
                  15 Seconds
                </label>
                <input
                  type='radio'
                  id='radioright'
                  name='align'
                  value='right'
                  onClick={() => {
                    setIsTimeSelected(true)
                    setTimer(20)
                  }}
                />
                <label className='e-btn' for='radioright'>
                  20 Seconds
                </label>
              </div>
              <Link to='/game-begin'>
                <button
                  onClick={() => {
                    swiftOrSpeare()
                    setIsGameStarted(true)
                  }}
                  disabled={!isTimeSelected}
                >
                  Start Game
                </button>
              </Link>
            </div>
          }
        />
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
              timer={timer}
            />
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
