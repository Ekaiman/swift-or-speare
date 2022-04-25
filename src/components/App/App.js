// import logo from './logo.svg'
import './App.css'
import React, { useEffect, useState } from 'react'
import apiCalls from '../../apiCalls'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import GameScreen from '../GameScreen/GameScreen'
import EndGame from '../End Game/EndGame'
import shakeSpeareQuotes from '../../shakeSpearData'
import Error from '../Error/Error'
import HomeScreen from '../HomseScreen/HomeScreen'

function App() {
  const [timer, setTimer] = useState(30)
  const [isTimeSelected, setIsTimeSelected] = useState(false)
  const [isEndGame, setIsEndGame] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [randomQuote, setRandomQuote] = useState('')
  const [isItSwiftOrSpeare, setIsitSwiftOrSpeare] = useState([])
  const [displayedQuotes, setDisplayedQuotes] = useState([])
  const [userGuess, setUserGuess] = useState([])
  const [taylorSwift, setTaylorSwift] = useState([])
  const [taylorSwiftUsableQuotes, setTaylorSwiftUsableQuotes] = useState([])
  const [speareUsableQuotes, setSpeareUsableQuotes] = useState([
    ...shakeSpeareQuotes
  ])
  const [shakeSpeare, setShakeSpeare] = useState(shakeSpeareQuotes)
  const [ranOutOfQuotes, setRanOutOfQuotes] = useState(false)

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
      setRanOutOfQuotes(false)
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

  const displaySwiftOrSpeare = () => {
    let swift = getRandomNumber(10)
    let speare = getRandomNumber(10)
    if (taylorSwiftUsableQuotes.length > 0 && speareUsableQuotes.length > 0) {
      if (swift > speare) {
        let index = getRandomNumber(taylorSwiftUsableQuotes.length)
        setRandomQuote(taylorSwiftUsableQuotes[index])
        setIsitSwiftOrSpeare(past => [...past, 'Swift'])
        taylorSwiftUsableQuotes.splice(index, 1)
      } else {
        let index = getRandomNumber(speareUsableQuotes.length)
        setRandomQuote(speareUsableQuotes[index])
        setIsitSwiftOrSpeare(past => [...past, 'Speare'])
        speareUsableQuotes.splice(index, 1)
      }
    } else {
      setRandomQuote("You're killing it! We're all out of quotes.")
      setIsEndGame(true)
      setRanOutOfQuotes(true)
    }
  }

  const getRandomNumber = length => {
    let index = Math.floor(Math.random() * length)
    return index
  }

  return (
    <div className='App'>
      <h1 className='App-header'>Swift or Speare</h1>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <HomeScreen
              setIsTimeSelected={setIsTimeSelected}
              setTimer={setTimer}
              displaySwiftOrSpeare={displaySwiftOrSpeare}
              setIsGameStarted={setIsGameStarted}
              isTimeSelected={isTimeSelected}
            />
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
              displaySwiftOrSpeare={displaySwiftOrSpeare}
              setUserGuess={setUserGuess}
              timer={timer}
              isEndGame={isEndGame}
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
              ranOutOfQuotes={ranOutOfQuotes}
              isEndGame={isEndGame}
            />
          }
        />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
