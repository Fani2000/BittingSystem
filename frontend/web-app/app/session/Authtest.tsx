'use client'

import React, { useState } from 'react'
import { updateAuctionTest } from '../actions/auctionActions'
import { Button } from 'flowbite-react'

const Authtest = () => {
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState<any>()

    const doUpdate = () => {
        setResults(undefined)
        setLoading(true)
        updateAuctionTest().then(res => setResults(res))
            .finally(() => setLoading(false))
    }

    return (
        <div className='flex items-center gap-4'>
            <Button outline isProcessing={loading} onClick={doUpdate}>Test Auth</Button>
            <div>{JSON.stringify(results, null, 2)}</div>
            {/* <div className="mt-4"></div> */}
        </div>
    )
}

export default Authtest