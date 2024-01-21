import Heading from '@/app/components/Heading'
import AuctionForm from '@/app/components/auctions/AuctionForm'
import React from 'react'

const Create = () => {
  return (
    <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'>
      <Heading title='Sell you car!' subtitle='Please enter the deatils of your car' />
      <AuctionForm />
    </div>
  )
}

export default Create