import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
       <Link to={'/signup'} className=' m-2 p-4 bg-green-500 text-white'>Sign Up</Link>
    <Link to={'/login'} className=' m-2 p-4 bg-green-500 text-white'>Login</Link>

    </div>
  )
}

export default Home
