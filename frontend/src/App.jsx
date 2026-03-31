import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import './App.css'
import Home from './Pages/Home'
import Form from './Pages/Form'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
