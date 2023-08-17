import React from 'react'
import Image from './Image'

const PlaceImg = ({place,index=0,className=null}) => {

    if(!place.photos?.length) {
        return ''
    }
    if (!className) {
        className = 'object-cover h-full w-full'
    }

  return (
    <div>

<Image className={className} 
src={place.photos[0]} alt="" />

    </div>
  )
}

export default PlaceImg