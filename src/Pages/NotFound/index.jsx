import React from 'react'
import page404 from "../../assets/images/page404.jpg"
function NotFound() {
  return (
    <div className='flex justify-center items-center'>
        <img className='h-[100vh] w-full' src={page404} alt="page404 !!!" />
    </div>
  )
}

export default NotFound