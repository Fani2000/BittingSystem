'use client'

import Image from 'next/image'
import React, { useState } from 'react'

type Props = {
    imageUrl: string;
    make: string;
}

const CarImage = ({ imageUrl, make }: Props) => {
    const [isLoading, setLoading] = useState(true)
    return (
        <Image
            src={imageUrl}
            alt={make + "image"}
            fill
            className={`bject-cover group-hover:opacity-75 duration-700 ease-in-out 
            ${isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'}`}
            sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw'
            onLoadingComplete={() => setLoading(false)}
            priority />
    )
}

export default CarImage