import React from "react";

const EndGame = ({ clearInterval, myInterval}) => { 
  
  return (
    <div>
      <h1> Game over!</h1>
      <button onCLick={() => clearInterval(myInterval) }>view</button>
    </div>
  )
}

export default EndGame