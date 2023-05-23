import React, { useEffect, useState } from 'react'
import AccountNav from './AccountNav'
import axios from 'axios'
import PlaceImg from './PlaceImg'
import { differenceInCalendarDays, format } from 'date-fns'
import { Link } from 'react-router-dom'
import {CiMoneyCheck1} from 'react-icons/ci'

const Bookings = () => {

const [booking, setBooking] = useState([])

useEffect(() => {
    axios.get('/booking')
    .then(response => {setBooking(response.data)})
}, [])

  return (
    <div>
        <AccountNav/>
        <div className='my-6 mx-10'>
        {booking?.length > 0 && booking.map((booking, i) => (
            <Link to={`/Account/Bookings/${booking._id}`} key={i} >
            <div className='flex gap-4 bg-secondary rounded-xl overflow-hidden mb-4 h-[200px]'>
                
                <div className='w-[200px]'>
                <PlaceImg className='h-[200px] object-cover' place={booking.place}/>
                </div>
               

                <div className='py-4 grow' >
                <h2 className='text-xl'>{booking.place.title}</h2>
                <div className='border-t border-gray-500 mt-2 '></div>
                <p className='text-secondary text-sm pt-3'>{format(new Date(booking.checkIn), 'yyyy-MM-dd')} to {format(new Date(booking.checkOut), 'yyyy-MM-dd')}</p>
                <div className='block'>
                  {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights 
                  <div className='flex'>
                 <CiMoneyCheck1 className='mt-[2px] mr-1' size={20}/> Total price: ${booking.price}
                 </div>
                </div>
            
                </div>
                
                
            </div>
            </Link>
        ))}
        </div>
    </div>
  )
}

export default Bookings