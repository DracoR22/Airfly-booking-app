import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {

  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/places')
    .then((response) => {setPlaces(response.data)})
  }, [])
  return (
    <div className='mx-10'>
     
      </div>
  )
}

export default Home