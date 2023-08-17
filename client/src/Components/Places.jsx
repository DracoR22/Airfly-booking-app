import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import AccountNav from './AccountNav'
import axios from 'axios'
import PlaceImg from './PlaceImg'


const Places = () => {

  const [places, setPlaces] = useState([])

useEffect(() => {
    axios.get('/api/v1/post/userPlaces'). then(({data}) => {
    setPlaces(data)
    }) 
}, [])
 
  return (
    <div className='mt-6 mx-10'>
      <AccountNav/>
         
        <div className='text-center mt-8'>
        <Link className='bg-button text-black py-2 px-6 rounded-full font-medium inline-flex gap-1' to={'/Account/Places/new'}>
        <AiOutlinePlus className='text-xl'/>
        Add a new place
        </Link>
        </div>
         
        {places.length > 0 && places.map((place, idx) => (
               <Link to={'/Account/Places/' + place._id}  className='flex gap-4 mt-4 bg-secondary p-4 rounded-2xl cursor-pointer' key={idx}>

                   <div className='flex w-32 h-32 grow shrink-0'>
                   <PlaceImg place={place}/>
                    </div>

                    <div className='grow-0 shrink'>
                    <h1 className='text-xl '>{place?.title}</h1>
                    <p className='text-sm mt-2'>{place.description}</p>
                    </div>

                </Link>
            ))}
  

    </div>
  )
}

export default Places