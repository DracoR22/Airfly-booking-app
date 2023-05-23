import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Places from './Places'
import AccountNav from './AccountNav'

const Account = () => {
    const [redirect, setRedirect] = useState(null)
    const {ready, user, setUser} = useContext(UserContext)
    

if(redirect)
return <Navigate to={redirect}/>

//Button Linked Components
    let {subpage} = useParams()
    if (subpage === undefined) {
        subpage = 'Profile'
    }

//LogOut
async function logout() {
   await axios.post('/logout')
   setRedirect('/LogIn')
   setUser(null)
   
}

if (!ready) {
    return 'Loading...'
}

if(ready && !user) {
    return <Navigate to={'/LogIn'}/>
}

  return (
    <div className='mx-8'>
       <AccountNav/>
        {subpage === 'Profile' && (
            <div className='text-center max-w-lg mx-auto'>
               <p className='mt-8'> Welcome {user.name}</p>
                <button onClick={logout} className='block w-full bg-red-500 text-white max-w-md mx-auto
                 font-medium py-2 rounded-full mt-2'>Log out</button>
            </div>
        )}
        {subpage === 'Places' && (
            <div>
            <Places/>
           
            </div>
        )}
    </div>
  )
}

export default Account