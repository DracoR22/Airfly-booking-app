import React, { useState } from 'react'
import { TbGridDots } from 'react-icons/tb'
import { IoIosArrowBack } from 'react-icons/io'

const PlaceGallery = ({place}) => {

    const [showPhotos, setShowPhotos] = useState(false)

    // See All Photos
    if (showPhotos) {
        return (
            <div className='absolute inset-0 bg-primary min-h-screen'>
    
                <div className='fixed bg-primary w-full h-20 '>
                    <div onClick={() => setShowPhotos(false)} className='cursor-pointer'>
                   <IoIosArrowBack className='absolute top-5 left-3 hover:bg-secondary p-2 text-[40px] rounded-full'/>
                   </div>
                </div>
    
                <div className='p-8 mx-10 grid gap-4 '>
                    
                {Array.isArray(place?.photos) && place?.photos?.length > 0 && place.photos.map((photo, i) => (
                <div key={i}>
                
                <img className='w-full' src={'http://localhost:3000/' + place.photos?.[0]} alt="" />
    
                </div>
            ))} 
               </div>
            </div>
        )}

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