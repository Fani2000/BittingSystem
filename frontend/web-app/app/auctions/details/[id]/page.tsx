
import Heading from '@/app/components/Heading'
import CarImage from '@/app/components/auctions/CarImage'
import CountDownTimer from '@/app/components/auctions/CountDownTimer'
import React from 'react'
import DetailedSpecs from './DetailedSpecs'
import { getCurrentUser } from '@/app/actions/authActions'
import { getDetailViewData } from '@/app/actions/auctionActions'
import EditButton from './EditButton'

const Details = async ({ params }: { params: { id: string } }) => {

    const data = await getDetailViewData(params.id)
    const user = await getCurrentUser()

    return (
        <div>
            <div className='flex justify-between'>
                <div className='flex gap-3 items-center'>
                    <Heading title={`${data.make} ${data.model}`} />
                    {user?.username === data.seller && (
                        <EditButton id={data.id} />
                    )}
                </div>
                <div className='flex gap-3'>
                    <h3 className='text-2xl font-semibold'>Time remaining: </h3>
                    <CountDownTimer auctionEnd={data.auctionEnd} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-3">
                <div className="w-full bg-gray-200 aspect-h-10 aspect-w-16 rounded-lg overflow-hidden">
                    <CarImage make={data.make} imageUrl={data.imageUrl} />
                </div>

                <div className="border-2 rounded-lg p-2 bg-gray-200">
                    <Heading title="Bids" />
                </div>
            </div>

            <div className="mt-3 grid grid-cols-1 rounded lg">
                <DetailedSpecs auction={data} />
            </div>
        </div>
    )
}

export default Details