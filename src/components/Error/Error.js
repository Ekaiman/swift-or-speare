import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
      <p>404 page not found</p>
      <Link to='/'>
        <button>Home</button>
      </Link>
    </div>
  )
}
export default Error
