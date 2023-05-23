import React, { useState } from 'react'
import { TbGridDots } from 'react-icons/tb'
import { IoIosArrowBack } from 'react-icons/io'

const PlaceGallery = ({place}) => {

    const [showPhotos, setShowPhotos] = useState(false)

   

  return (
    <div>
         <div>
        <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden '>

        <div>
            {place.photos?.[0] && (
                <img onClick={() => setShowPhotos(true)} className='aspect-square object-cover h-[400px] w-full cursor-pointer' src={'http://localhost:3000/' + place.photos?.[0]} alt="" />
            )}
        </div>

        <div className='grid gap-2'>
        {place.photos?.[1] && (
                <img onClick={() => setShowPhotos(true)} className='aspect-square object-cover h-[200px] w-full cursor-pointer'
                 src={'http://localhost:3000/' + place.photos?.[1]} alt="" />
            )}

         {place.photos?.[2] && (
                <img onClick={() => setShowPhotos(true)} className='aspect-square object-cover h-[192px] w-full cursor-pointer'
                 src={'http://localhost:3000/' + place.photos?.[2]} alt="" />
            )}

     
        </div>


        </div>

        <div className='relative'>
        <button onClick={() => setShowPhotos(true)} className='absolute bottom-2 right-2 py-2 px-4 flex items-center
         bg-white rounded-2xl shadow-md shadow-black
          text-black font-medium'> <TbGridDots className='text-lg mr-3'/> Show all photos</button>
         </div>
       
        </div>
        
    </div>
  )
}

export default PlaceGallery