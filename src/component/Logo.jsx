import React from 'react'

function Logo({width = '100px'}) {
  return (
    <img 
      src='src\assets\logo.png'
      width={width}
      className='rounded-lg object-cover object-center'
    />
  )
}

export default Logo