import React from 'react'
import "./Notification.css"

export const Notification = ({ notificationStatus, name='user', error}) => {
  if (notificationStatus === null){
    return null
  }
  
  if (notificationStatus === 'success')
  return (
    <div className='success'>
      <h2>Added {name}</h2>
    </div>
  )

  if (notificationStatus === 'alreadyDeleted')
  return (
    <div className='error'>
      <h2>Information of {name} has already been removed from server</h2>
    </div>
  )

  if (notificationStatus === 'validationError')
  return (
    <div className='error'>
      <h2>{error}</h2>
    </div>
  )
}
