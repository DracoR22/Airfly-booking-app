import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { differenceInCalendarDays } from 'date-fns'
import { UserContext } from '../Context/UserContext'

const LateralBar = () => {
    
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(1)
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [redirect, setRedirect] = useState('')
   const {user, setUser} = useContext(UserContext)

   useEffect(() => {
    if (user) {
      setName(user.name)
    }
   }, [user])


  //Display Specific File
  const {id} = useParams()
  const [place, setPlace] = useState([])
  useEffect(() => {
      if (!id) {
          return
      }
      axios.get('/places/' + id)
      .then((response) => {setPlace(response.data)})
  }, [id])

  if(!place) return ''

  const price = parseFloat(place.price)

  let numberOfNights = 0
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    //Book Place
   async function bookPlace() {
    if(!user) {
      alert('Please log in to book a place')
      return;
    }

      const response = await axios.post('/booking', {checkIn, checkOut, guests, name, mobile,
            place:place._id, price:numberOfNights * price})  
           
            const bookingId = response.data._id
            setRedirect(`/Account/Bookings/${bookingId}`)
    }
    
    if (redirect) {
      return <Navigate to={redirect}/>
  }
 
  

  return (
<div className='hidden md:flex'>
    <div >
         <div className='text-center items-center justify-center right-0 
         border border-secondary px-10 py-6 rounded-xl shadow-black shadow-2xl bg-primary'>

            <div className='flex items-center justify-center mb-8'>
                <h2 className='text-2xl font-medium'>${place.price}</h2>
                <p className='text-secondary pl-2'>total</p>
            </div>

            <div className='rounded-xl border border-gray-400'>
                <div className='grid grid-cols-2'>
                    <div className='border-b'>
                    <label className='text-xs'>CHECK-IN</label>
                    <br />
                    <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)}
                     type='date' className=' text-sm border-gray-400 p-1 bg-transparent focus:outline-none'/>
                   </div>
                   <div className='border-b border-l '>
                   <label className='text-xs'>CHECK-OUT</label>
                  <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)}
                   type='date' className='text-sm border-gray-400 p-1 bg-transparent focus:outline-none '/>
                  </div>
                </div>

                <div>
                <label value={guests} onChange={ev => setGuests(ev.target.value)}
                 className='text-xs'>GUESTS:</label>
              <input type='number' className='text-sm text-center p-4 bg-transparent focus:outline-none '/>
              </div>

                
              {numberOfNights > 0 &&  (
               <div>
                
                
               <label 
                className='text-sm'>Your full name:</label>
                
               <input value={name} onChange={ev => setName(ev.target.value)}
                type='text' className='text-sm p-2 mb-1 ml-1 rounded-xl bg-secondary focus:outline-none'/>
               
                 
                <div className='border-b border-b-gray-400'></div>

               <label 
                className='text-sm'>Phone number:</label>
               <input value={mobile} onChange={ev => setMobile(ev.target.value)}
                type='text' className='text-sm p-2 bg-secondary ml-1 my-2 rounded-xl focus:outline-none '/>

             </div>
              )}


            </div>
              <div>
              <button onClick={bookPlace} className='text-black text-lg font-medium
               bg-button my-4 p-2 rounded-xl w-full'>Reserve</button>
              </div>

              <div>
                <p >You won't be charged yet</p>
                <p className='mt-3'>Price shown is the total trip price, including <br/> 
                 additional fees and taxes.</p>
              </div>

               
               {numberOfNights > 0 && (
                <div>
                <div className='border-b border-gray-400 my-4'></div>
              <div className='flex text-start'>
              <p className='flex-1'>Total</p>
              <p>${numberOfNights * price}</p>
              </div>
              </div>
               )}
              

              
         </div>

    

    </div>
</div>
  )
}

export default LateralBar