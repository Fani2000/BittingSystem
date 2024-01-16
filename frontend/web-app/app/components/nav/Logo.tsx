'use client'

import React from 'react'
import { AiOutlineCar } from 'react-icons/ai'
import { useParamsStore } from "@/hooks/useParamsStore"

const Logo = () => {
    const reset = useParamsStore(state => state.reset)
    return (
        <div onClick={reset} className="flex items-center gap-2 text-3xl text-red-500 font-semibold cursor-pointer">
            <AiOutlineCar size={34} />
            <div>Bidding Auctions</div>
        </div>
    )
}

export default Logo