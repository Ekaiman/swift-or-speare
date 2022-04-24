import { Link } from "react-router-dom"

const HomeScreen = ({ setIsTimeSelected, setTimer, displaySwiftOrSpeare, setIsGameStarted, isTimeSelected }) => {
  return (
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
            displaySwiftOrSpeare()
            setIsGameStarted(true)
          }}
          disabled={!isTimeSelected}
        >
          Start Game
        </button>
      </Link>
    </div>
  )
}
export default HomeScreen
