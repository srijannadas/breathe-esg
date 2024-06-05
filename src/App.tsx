import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './components/SignUp/SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
   
    <Routes>
    <Route path='/' element={<Home/>}/>

      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
