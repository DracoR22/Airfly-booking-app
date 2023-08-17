import React, { useContext, useState } from 'react'
import { AiFillGitlab } from "react-icons/ai";
import { BiSearch } from "react-icons/bi"
import { GiHamburgerMenu } from "react-icons/gi"
import { FaUserCircle } from "react-icons/fa"
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';

const Navbar = () => {

const [nav, setNav] = useState(false)
const handleNav = () => {
    setNav(!nav)
}

//Use User
const {user, setUser} = useContext(UserContext)

//LogOut
async function logout() {
  await axios.post('/api/v1/auth/logout')
  setUser(null)}

  return (
    <div className='mx-10'>
        <header className='p-4 flex justify-between'>
             
            <Link to='/'>
            <div className='flex items-center gap-1'>
            <AiFillGitlab className='h-10 w-10 text-accent mr-1'/>
            <span className='font-bold text-xl'>AirFly</span>
            </div>
            </Link>
             
            <div className='hidden md:flex items-center gap-2 border border-secondary rounded-full px-4 shadow-gray-500 shadow-sm'>
               <p className='border-r border-secondary pr-4'>Anywhere</p>
              
               <p className='border-r border-secondary pr-4'>Any week</p>
              
               <p>Add guests</p>
                 <div className='bg-button text-black p-2 rounded-full ml-2'>
                   <BiSearch className='w-4 h-4'/>
                 </div>
            </div>

              
            <div onClick={handleNav} className='flex items-center gap-2 border border-secondary rounded-full py-2 px-4 overflow-hidden cursor-pointer shadow-gray-500 shadow-sm'>
                <GiHamburgerMenu className='text-xl text-accent'/>
                 <div className='text-2xl'>
                <FaUserCircle/>
                 </div>
                 {/* Display User */}
                 {!!user && (
                  <div>
                    {user.name}
                  </div>
                 )}
            </div>

            {/* Hamburger Menu */}

                <div className={nav ? 'absolute top-[70px] right-6 border border-secondary rounded-lg p-4 shadow-gray-500 shadow-sm w-[250px] bg-primary'
                 : 'hidden'}>
                    <div className='relative'>
                     <Link to='/SignUp' onClick={handleNav}>  <p className='font-medium text-secondary hover:bg-secondary
                      duration-300 rounded-md p-2 mb-1' onClick={user ? logout : () => console.log('User is not logged in.')}>{user? 'Log out' : 'Sign up'}</p></Link> 
                      <Link to={user ? '/Account' : '/LogIn'} onClick={handleNav}> <p className='p-2 hover:bg-secondary 
                      duration-300 rounded-md'>{user ? 'Account': 'Log in'}</p> </Link> 
                        <div className='border-b border-secondary pb-2'></div>
                        <div className='my-2 hover:bg-secondary duration-300 rounded-md'>
                            <ThemeToggle/>
                        </div>
                    </div>
                </div>

        </header>
    </div>
  )
}

export default Navbar