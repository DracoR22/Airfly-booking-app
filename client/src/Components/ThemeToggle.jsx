import React, { useContext } from 'react'
import { HiMoon } from 'react-icons/hi'
import { ThemeContext } from '../Context/ThemeContext'


const ThemeToggle = () => {

const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className='p-2'>
      {theme === 'dark' ? (
        <div className='flex items-center cursor-pointer' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
             <HiMoon className='text-primary text-2xl mr-2'/> <p>Light Theme</p>
        </div>
      ) : (
      <div className='flex items-center cursor-pointer' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}> 
      <HiMoon className='text-primary text-2xl mr-2'/> <p>Dark Theme</p>
       </div>
       )}
    </div>
  )
}

export default ThemeToggle
