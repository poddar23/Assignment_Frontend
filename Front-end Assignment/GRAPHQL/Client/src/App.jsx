import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Components/Home'
import FruitsCreate from './Components/FruiteCreate'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FruitsCreate/>
    </>
  )
}

export default App
