import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import './App.css'
import Home from './Pages/Home'
import AddStudent from './Pages/AddStudent'
import Update from './Pages/Update'
import View from './Pages/View'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
