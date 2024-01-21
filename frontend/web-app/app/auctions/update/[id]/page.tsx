import { getDetailViewData } from '@/app/actions/auctionActions'
import Heading from '@/app/components/Heading'
import AuctionForm from '@/app/components/auctions/AuctionForm'
import React from 'react'

const Update = async ({ params }: { params: { id: string } }) => {
    const data = await getDetailViewData(params.id)
    return (
        <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'>
            <Heading title='Update your acution' subtitle='Please update the details of your car' />

            <AuctionForm auction={data} />

        </div>
    )
}

export default Update