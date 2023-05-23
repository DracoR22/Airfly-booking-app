import React from 'react'

const PlaceImg = ({place,index=0,className=null}) => {

    if(!place.photos?.length) {
        return ''
    }
    if (!className) {
        className = 'object-cover h-full w-full'
    }

  return (
    <div>

<img className={className} 
src={'http://localhost:3000/' + place.photos?.[index]} alt="" />

    </div>
  )
}

export default PlaceImg