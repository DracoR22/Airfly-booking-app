import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaceGallery from './PlaceGallery'
import { differenceInCalendarDays } from 'date-fns'
import {CiMoneyCheck1} from 'react-icons/ci'

const BookingPlace = () => {
    const {id} = useParams()
    const [booking, setBooking] = useState(null)


    useEffect(() => {
        if (id) {
        axios.get('/booking')
        .then(response => {const FoundBooking = (response.data.find(({_id}) => _id === id )
       
        )
        if (FoundBooking) {
            setBooking(FoundBooking)
        }
    })
        }
    } , [id])

    if(!booking) {
        return ''
    }


  return (
    <div className='my-4 mx-10'>
     <h1 className='text-3xl'>{booking.place.title}</h1>

     <div className='bg-secondary p-4 my-4 rounded-2xl'>
        <h2>Your booking information:</h2>
        <div className='block'>
                  {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights 
                  <div className='flex'>
                 <CiMoneyCheck1 className='mt-[2px] mr-1' size={20}/> Total price: ${booking.price}
                 </div>
                </div>


     </div>

     <PlaceGallery place={booking.place}/>
     <p className='my-4'>{booking.place.description}</p>
    </div>
  )
}

export default BookingPlace