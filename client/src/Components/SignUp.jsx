import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {

const [redirect, setRedirect] = useState(false)
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
async function registerUser(ev) {
  ev.preventDefault()
  try{
    await axios.post('/api/v1/auth/register', {
        name,
        email,
        password,
      })
    alert('You created an account')
    setRedirect(true)
  } catch (e){
    alert('Registration failed, please try again')
  }
}

if (redirect) {
  return <Navigate to={'/LogIn'}/>
}

  return (
    <div className='mt-4 mx-6'>
       <h1 className='text-4xl text-center font-bold mt-32 mb-2'>Sign Up</h1>
           <form className='max-w-md mx-auto' onSubmit={registerUser}>
           <input type="username" placeholder='User Name' className='bg-secondary block w-full my-4 h-12 pl-4 rounded-lg'
            value={name} onChange={ev => setName(ev.target.value)}/>
            <input type="email" placeholder='Email' className='bg-secondary block w-full my-4 h-12 pl-4 rounded-lg'
             value={email} onChange={ev => setEmail(ev.target.value)}/>
            <input type="password" placeholder='Password' className='bg-secondary w-full h-12 pl-4 rounded-lg'
             value={password} onChange={ev => setPassword(ev.target.value)}/>
            <button className='w-full my-3 bg-button hover:bg-hover duration-300 font-medium
             text-black h-10 rounded-lg' type='submit'>
                Sign up
            </button>

            <div className='flex text-sm font-medium'>
            <p>Already have an account?</p>
           <Link to='/LogIn'> <p className='pl-1 underline'>Log in</p></Link>
            </div>

            </form>
            
    </div>
  )
}

export default SignUp