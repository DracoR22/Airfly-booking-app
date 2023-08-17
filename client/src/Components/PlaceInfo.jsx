import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PlaceInfo = () => {
    //Display Specific File
    const {id} = useParams()
    const [place, setPlace] = useState([])
    
    useEffect(() => {
        if (!id) {
            return
        }
        axios.get('/api/v1/post/places/' + id)
        .then((response) => {setPlace(response.data)})
    }, [id])
  return (
    <div >
        <div >
            <h2 className='text-2xl font-medium mb-2'>About this place</h2>
            <p>{place.description}</p>
            <p className='text-secondary mt-4'>Check-in: {place.checkIn}</p>
            <p className='text-secondary'>Check-out: {place.checkOut}</p>
            <p className='text-secondary'>Max guests: {place.maxGuests}</p>
            <h2 className='text-2xl font-medium mt-6 mb-2'>Extra Info</h2>
            <p className='text-sm text-secondary mt-2'>{place.extraInfo}</p>
        </div>
    </div>
  )
}

export default PlaceInfo