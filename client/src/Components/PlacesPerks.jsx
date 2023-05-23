import React from 'react'
import { AiOutlineWifi, AiOutlineCar,  } from 'react-icons/ai'
import { Gi3DGlasses } from "react-icons/gi";
import { FaDog } from "react-icons/fa";
import { BsDoorClosed } from "react-icons/bs";



const PlacesPerks = ({selected, onChange}) => {

function handleCbClick(ev) {
const {checked, name} = ev.target
if (checked) {
  onChange([...selected, name])
} else {
  onChange([...selected.filter(selectedName => selectedName !== name)])
}
}

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2'>
        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCbClick}/>
                <AiOutlineWifi/>
                <span>
                  Wifi
                  </span>
              </label>

              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCbClick}/>
                <AiOutlineCar/>
                <span>
                  Free parking
                  </span>
              </label>

              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type="checkbox" checked={selected.includes('TV')} name="TV" onChange={handleCbClick}/>
                <Gi3DGlasses/>
                <span>
                  TV
                  </span>
              </label>

              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type="checkbox" checked={selected.includes('pets')} name="pets" onChange={handleCbClick}/>
                <FaDog/>
                <span>
                  Pets allowed
                  </span>
              </label>

              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type="checkbox" checked={selected.includes('entrance')} name="entrance" onChange={handleCbClick}/>
                <BsDoorClosed/>
                <span>
                  Private entrance
                  </span>
              </label>
    </div>
  )
}

export default PlacesPerks