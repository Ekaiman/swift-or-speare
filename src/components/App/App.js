// import logo from './logo.svg'
import './App.css'
import React, { useEffect, useState } from 'react'
import apiCalls from '../../apiCalls'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import GameScreen from '../GameScreen/GameScreen'
import EndGame from '../End Game/EndGame'
import shakeSpeareQuotes from '../../shakeSpearData'
import taylorSwiftQuotes from '../../shakeSpearData'
import Error from '../Error/Error'
import HomeScreen from '../HomseScreen/HomeScreen'

function App() {

  const shakeSpeareQuotes = [
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
  ]

  const taylorSwiftQuotes = [
    'This is a new year.A new beginning.And things will change.',
    'You took a swing, I took it hard. And down here from the ground I see who you are',
    'No matter what happens in life, be good to people. Being good to people is a wonderful legacy to leave behind.',
    'I never want to change so much that people cant recognize me.',
    'Im intimidated by the fear of being average.',
    'Just be yourself, there is no one better.',
    'Words can break someone into a million pieces, but they can also put them back together. I hope you use yours for good, because the only words youll regret more than the ones left unsaid are the ones you use to intentionally hurt someone.',
    'You can write a book on how to ruin someones perfect day.',
    'giving up doesnt always mean your weak sometimes your just strong enough to let go',
    "So don't you worry your pretty little mind because people throw rocks at things that shine",
    "The way you walk, way you talk, way you say my name; it's beautiful, wonderful, don't you ever change.",
    "The only one who's got enough of me to break my heart.",
    "I've wanted one thing for me whole life and I'm not going to be that girl who wants one thing her whole life then gets it and complains."
  ]
  const [timer, setTimer] = useState(30)
  const [isTimeSelected, setIsTimeSelected] = useState(false)
  const [isEndGame, setIsEndGame] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [randomQuote, setRandomQuote] = useState('')
  const [isItSwiftOrSpeare, setIsitSwiftOrSpeare] = useState([])
  const [displayedQuotes, setDisplayedQuotes] = useState([])
  const [userGuess, setUserGuess] = useState([])
  const [taylorSwift, setTaylorSwift] = useState(taylorSwiftQuotes)
  const [taylorSwiftUsableQuotes, setTaylorSwiftUsableQuotes] = useState([...taylorSwift])
  const [speareUsableQuotes, setSpeareUsableQuotes] = useState([
    ...shakeSpeareQuotes
  ])
  const [shakeSpeare, setShakeSpeare] = useState(shakeSpeareQuotes)
  const [ranOutOfQuotes, setRanOutOfQuotes] = useState(false)

  

  // useEffect(() => {
  //   apiCalls
  //     .fetchData('https://taylorswiftapi.herokuapp.com/get-all?album=fearless')
  //     .then(data => {
  //       setTaylorSwift(data)
  //     })
  // }, [])

  // useEffect(() => {
  //   if (!isGameStarted) {
  //     let cleanedQuotes = []
  //     taylorSwift.forEach(tquote => {
  //       if (tquote.quote.includes('/')) {
  //         let cleaned = tquote.quote.replace(/\//g, '')
  //         cleanedQuotes.push(cleaned)
  //       } else {
  //         cleanedQuotes.push(tquote.quote)
  //       }
  //     })
  //     setTaylorSwiftUsableQuotes([...cleanedQuotes])
  //   }
  // }, [taylorSwift, isGameStarted])

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
