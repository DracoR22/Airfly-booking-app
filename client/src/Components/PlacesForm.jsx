import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PlacesPerks from './PlacesPerks'
import { Navigate, useParams } from 'react-router-dom'
import { AiOutlineCloudUpload, AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'
import AccountNav from './AccountNav'

const PlacesForm = () => {
    const {id} = useParams()
    const [redirect, setRedirect] = useState(false)
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('')
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [price,setPrice] = useState('');

    //Access Edit File
    useEffect(() => {
    if (!id) {
      return
    }
    axios.get('/places/' + id)
    .then(response => {
      const {data} = response
      setTitle(data.title)
      setAddress(data.address)
      setAddedPhotos(data.photos)
      setDescription(data.description)
      setPerks(data.perks)
      setExtraInfo(data.extraInfo)
      setCheckIn(data.checkIn)
      setCheckOut(data.checkOut)
      setMaxGuests(data.maxGuests)
      setPrice(data.price)
    })
    }, [id])
  
    function inputHeader(text) {
      return (
        <h2 className='text-2xl mt-4 font-medium'>{text}</h2>
      )
    }
    
    function inputDescription(text) {
      return (
        <p className='text-seconday text-sm pb-2'>{text}</p>
      )
    }
  
    function preInput(header, description) {
      return (
        <>
        {inputHeader(header)}
        {inputDescription(description)}
        </>
      )
    }
  
    //Upload By Link
    async function addPhotoByLink(ev) {
      ev.preventDefault()
     const {data:filename} = await axios.post('/upload-by-link', {link :photoLink})
     setAddedPhotos(prev => {
      return [...prev, filename]
     })
     setPhotoLink('')
      }
  
  
      //Upload Photos From Device
     function uploadPhoto(ev) {
      const files = ev.target.files
      const data = new FormData()
      for (let i = 0; i < files.length; i++) {
        data.append('photos', files[i])
      }
     axios.post('/upload', data, {
        headers: {'Content-type':'multipart/form-data'}
      }).then(response => {
        const {data:filenames} = response
        setAddedPhotos(prev => {
          return [...prev, ...filenames]
         })
      })
    }

    //Delete Photos
    function removePhoto(filename) {
    setAddedPhotos([...addedPhotos.filter(photo => photo !== filename)])
    }

    //Select the Main Photo
    function selectAsMainPhoto(filename) {
        const addedPhotosWithoutSelected = addedPhotos.filter(photo => photo !== filename)
        const newAddedPhotos = [filename,... addedPhotosWithoutSelected]
        setAddedPhotos(newAddedPhotos)
    }
  
    //Add and Update Places
   async function savePlace(ev) {

  ev.preventDefault()

  if (!title || !address || !addedPhotos || !description ||
     !perks || !extraInfo || !checkIn || !checkOut || !maxGuests || !price) {
      alert('Please fill in all the required fields.');
    return; // Return early if any input field is empty
  }

  const placeData = {
    title, address,addedPhotos,description,
perks,extraInfo,checkIn,checkOut,maxGuests,price,
}
  if(id) {
    //Update Place
    await axios.put('/places', 
  {id, 
    ...placeData
  })
  setRedirect(true)
    
  } else {
    // New Place
    await axios.post('/places', 
  placeData)
  setRedirect(true)
    }
  }
  
    if (redirect) {
   return <Navigate to={'/Account/Places'}/>
    }
  
  return (
    <div className='mx-5'>
        <AccountNav/>
    <form onSubmit={savePlace}>
     {preInput('Title', 'title for your place, should be short an descriptive')}
      <input value={title} onChange={ev => setTitle(ev.target.value)} className='w-full p-2 rounded-2xl bg-secondary' type="text" placeholder='Title, for example: My apartment'/>

      {preInput('Address', 'address of your place')}
      <input value={address} onChange={ev => setAddress(ev.target.value)} className='w-full p-2 rounded-2xl bg-secondary' type="text" placeholder='Address'/>

      {preInput('Photos', 'Upload a photo using a link')}
       <div className='flex gap-2'>
        <input value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} className='w-full p-2 rounded-2xl bg-secondary' type="text" placeholder='Upload photo by link'/>
        <button onClick={photoLink ? addPhotoByLink : null}  className='bg-button px-4 rounded-2xl text-black font-medium'>Upload</button>
       </div>

    
       {preInput('', 'Or upload from your device')}
       <div className='mt-2 grid gap-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4'>
      
        {addedPhotos.length > 0 && addedPhotos.map((link, idx) => (
           <div className='h-32 flex relative' key={idx}>
            <img className='rounded-2xl w-full position-center h-32' src={'http://localhost:3000/'+link} alt="/" />
            <div onClick={() => removePhoto(link)} className='absolute bottom-1 right-2 cursor-pointer bg-black p-1 rounded-full bg-opacity-90'>
         <HiOutlineTrash className='text-2xl text-white'/>
            </div>
            <div onClick={() => selectAsMainPhoto(link)} className='absolute top-1 left-2 cursor-pointer bg-black p-1 rounded-full bg-opacity-90'>
                {link === addedPhotos[0] && (
                    <AiFillStar className='text-2xl text-yellow-500'/>
                )}
                {link !== addedPhotos[0] && (
                     <AiOutlineStar className='text-2xl text-white'/>
                )}
        
            </div>
          </div>
        ))}
      <label className='h-32 cursor-pointer border bg-transparent rounded-2xl p-2 flex items-center justify-center'>
      <input type="file"className='hidden' onChange={uploadPhoto} multiple />
        <AiOutlineCloudUpload className='text-3xl'/>
        </label>
      </div>


      {preInput('Description', 'description of our place' )}
      <textarea value={description} onChange={ev => setDescription(ev.target.value)} className='w-full border my-1 py-4 px-3 rounded-2xl bg-secondary h-[200px]'/>

      {preInput('Perks', 'select all the perks of your place')}
      <div >
        
        <PlacesPerks selected={perks} onChange={setPerks}/>

      </div>
    
    {preInput('Extra info', 'house rules, etc')}
      <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} className='w-full border my-1 py-4 px-3 rounded-2xl bg-secondary '/>

     {preInput('Check in & out times, max guests', 'add check in out times')}
    

      <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-2'>

        <div>
          <h3 className='mt-2'>Check in time</h3>
        <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)} className='w-full rounded-xl p-1 bg-secondary' type="text" placeholder='14:00' />
        </div>

        <div>
          <h3 className='mt-2'>Check out time</h3>
        <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)} className='w-full rounded-xl p-1 bg-secondary'
         type="text" placeholder='11:00'/>
        </div>

        <div>
          <h3 className='mt-2'>Max number of guests</h3>
        <input value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}
         className='w-full rounded-xl p-1 bg-secondary' type="number" />
        </div>

       
        <div>
          <h3 className='mt-2'>Price per night</h3>
        <input value={price} onChange={ev => setPrice(ev.target.value)} className='w-full rounded-xl p-1 bg-secondary'
         type="text" placeholder='100 USD'/>
        </div>

      </div>

      <div>
        <button className='bg-button p-2 rounded-2xl text-black w-full my-4'>Save</button>
      </div>

    </form>
  </div>
  )
}

export default PlacesForm