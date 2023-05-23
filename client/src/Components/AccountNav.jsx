import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const AccountNav = () => {

  const {pathname} = useLocation()
  let subpage = pathname.split('/')?.[2]
  if (subpage === undefined) {
    subpage = 'Profile'
  }

// Button Linked Components
function linkClasses(type=null) {
   
    let classes = 'inline-flex py-2 px-6 rounded-full gap-1 bg-secondary'
    if (type === subpage) {
        classes += 'py-2 px-6 bg-button text-black font-medium rounded-full'
    }
    return classes
    }

  return (
    <div>
         <nav className='w-full flex justify-center mt-6 sm:gap-2'>
            <Link className={linkClasses('Profile')} to={'/Account'}>My Profile</Link>
            <Link className={linkClasses('Bookings')} to={'/Account/Bookings'}>My Bookings</Link>
            <Link className={linkClasses('Places')} to={'/Account/Places'}>My Accommodations</Link>
        </nav>
    </div>
  )
}

export default AccountNav