import React, { useEffect } from 'react'
import { ThemeProvider } from './Context/ThemeContext'
import axios from 'axios'
import ThemeToggle from './Components/ThemeToggle'
import Navbar from './Components/Navbar'
import { Routes, Route } from 'react-router-dom'
import LogIn from './Components/LogIn'
import Home from './Components/Home'
import SignUp from './Components/SignUp'
import { UserContextProvider } from './Context/UserContext'
import Account from './Components/Account'
import Places from './Components/Places'
import PlacesForm from './Components/PlacesForm'
import Place from './Components/Place'
import Bookings from './Components/Bookings'
import BookingPlace from './Components/BookingPlace'



//Default Url
axios.defaults.baseURL = import.meta.env.VITE_SERVER_BASE_URL

//Keep Session Cookies
axios.defaults.withCredentials = true



const App = () => {

  return (
    <UserContextProvider>
    <ThemeProvider>
    <Navbar/>
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/LogIn' element={<LogIn/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='/Account' element={<Account/>}/>
      <Route path='/Account/Places' element={<Places/>}/>
      <Route path='/Account/Places/new' element={<PlacesForm/>}/>
      <Route path='/Account/Places/:id' element={<PlacesForm/>}/>
      <Route path='/Place/:id' element={<Place/>}/>
      <Route path='/Account/Bookings' element={<Bookings/>}/>
      <Route path='/Account/Bookings/:id' element={<BookingPlace/>}/>
    </Routes>
    </ThemeProvider>
    </UserContextProvider>
  )
}

export default App