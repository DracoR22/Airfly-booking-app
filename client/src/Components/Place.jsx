import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LateralBar from './LateralBar'
import PlaceInfo from './PlaceInfo'
import PlaceGallery from './PlaceGallery'

const Place = () => {
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

    if(!place) return ''


  return (
    <div className='mx-12 pt-4'>
        <div className='mb-2'>
        <h1 className='text-3xl mb-3 font-medium'>{place.title}</h1>
        <a className='font-medium underline' target='_blank' href={"https://maps.google.com/?q=" + place.address}>{place.address}</a>
        </div>
        
         <div>
         <PlaceGallery place ={place}/>
         </div>

        <div className='grid md:grid-cols-[2fr_1fr] my-10'>

        <div className='mr-16'>
        <PlaceInfo/>

        </div>

        <div >
        <LateralBar/>
        </div>
        

        </div>

    
    </div>
  )
}

export default Place