import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'

const LogIn = () => {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [redirect, setRedirect] = useState(false)
const {setUser} = useContext(UserContext)
async function handleLoginSubmit(ev) {
  ev.preventDefault()
  try{
   const {data} = await axios.post('/login', {email, password})
   setUser(data)
    alert('Login succesful')
    setRedirect(true)
  } catch (e) {
    alert('Login failed')
  }
}

if (redirect) {
  return <Navigate to={'/'}/>
}

  return (
    <div className='mt-4 mx-6'>
       <h1 className='text-4xl text-center font-bold mt-32 mb-2'>Log in</h1>
           <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
            <input type="email" placeholder='Email' className='bg-secondary block w-full
             my-4 h-12 pl-4 rounded-lg' value={email} onChange={ev => setEmail(ev.target.value)}/>
            <input type="password" placeholder='Password' className='bg-secondary w-full
             h-12 pl-4 rounded-lg' value={password} onChange={ev => setPassword(ev.target.value)}/>
            <button className='w-full my-3 bg-button hover:bg-hover 
            duration-300 font-medium text-black h-10 rounded-lg' type='submit'>
                Log in
            </button>

            <div className='flex text-sm font-medium'>
            <p>Don't have an account yet?</p>
          <Link to='/SignUp'> <p className='pl-1 underline'>Sign up</p></Link> 
            </div>

            </form>
            
    </div>
  )
}

export default LogIn