'use client'

import React from 'react'
import { AiOutlineCar } from 'react-icons/ai'
import { useParamsStore } from "@/hooks/useParamsStore"
import { usePathname, useRouter } from 'next/navigation'

const Logo = () => {
    const router = useRouter()
    const pathName = usePathname()
    const reset = useParamsStore(state => state.reset)

    const doReset = () => {
        if (pathName !== '/') {
            router.push('/')
        }
        reset()
    }

    return (
        <div onClick={doReset} className="flex items-center gap-2 text-3xl text-red-500 font-semibold cursor-pointer">
            <AiOutlineCar size={34} />
            <div>Bidding Auctions</div>
        </div>
    )
}

export default Logo