import React from 'react'

function Overview({username}) {
  return (
    <div>
        <div className='p-10'>
            <h1 className='text-white font-semibold text-3xl'>Overview: {username}</h1>
        </div>
    </div>
  )
}

export default Overview