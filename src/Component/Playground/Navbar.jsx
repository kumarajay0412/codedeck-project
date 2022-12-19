import React from 'react'

function Navbar() {
  return (
    <div className='p-2 bg-black flex justify-center items-center gap-4'>
        <img className='w-24 h-24' src='./logo.png' alt=''/>
        <div className='text-white tetx-4xl'>
            Code Deck
        </div>

    </div>
  )
}

export default Navbar