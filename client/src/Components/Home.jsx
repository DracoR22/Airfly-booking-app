import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {

  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/places')
    .then((response) => {setPlaces(response.data)})
    .catch((error) => {
      // Handle the error here
      console.error('Error fetching places:', error);
    });
  }, [])

  
  return (
    <div className='mx-10'>
     <div className='mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8'>
      {places && places.length && places.map((place, idx) => (
    <Link key={idx} to={'/Place/' + place._id}>
      
      <div className='flex bg-secondary rounded-2xl'>
      {place.photos?.[0] && (
        <img className='rounded-2xl object-cover aspect-square w-full' src={`${import.meta.env.VITE_IMG_URL}${place.photos?.[0]}`} alt="" />
      )}
      </div>

     <div className='mt-2'>
     <h2 className='font-medium truncate'>{place.title}</h2>
     <h2 className='text-sm text-secondary'>{place.address}</h2>
     </div>

     <div className='flex mt-2'>
     <p className='font-medium'>${place.price}</p>
     <p className='text-secondary pl-1'>night</p>
     </div>
     
    </Link>
   ))}
      </div>
      </div>
  )
}

export default Home