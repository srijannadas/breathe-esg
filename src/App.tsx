import { useState } from 'react'
import './App.css'
import SignUp from './components/SignUp/SignUp'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login/Login'

function App() {

  return (
    <>
   
    <Routes>
    <Route path='/' element={<Home/>}/>

      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>

    </Routes>
    </>
  )
}

export default App
