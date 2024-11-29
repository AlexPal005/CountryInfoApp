import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Countries } from './pages/Countries/Countries'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Country } from './pages/Country/Country'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/countries" element={<Countries />} />
        <Route path="/country/:countryCode" element={<Country />} />
        <Route path="/*" element={<Navigate to="/countries" replace />} />
      </Routes>
    </div>
  )
}

export default App
