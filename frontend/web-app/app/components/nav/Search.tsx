"use client";

import { useParamsStore } from '@/hooks/useParamsStore';
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';

const Search = () => {
    const setParams = useParamsStore(state => state.setParams)
    // const [value, setValue] = useState('')
    const setSearchValue = useParamsStore(state => state.setSearchValue)
    const searchValue = useParamsStore(state => state.saerchValue)

    const handleOnChange = (e: any) => {
        setSearchValue(e.target.value)
    }

    const handleSearch = () => {
        console.log(searchValue)
        setParams({ searchTerm: searchValue })
    }

    return (
        <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
            <input type='text'
                placeholder='Search for cars by make, model or color'
                className='
                    flex-grow pl-5 bg-transparent 
                    focus:outline-none border-transparent
                    focus:border-transparent
                    focus:ring-0
                    text-sm
                    text-gray-600
                '
                onChange={handleOnChange}
                onKeyDown={e => { if (e.key === 'Enter') handleSearch() }}
                value={searchValue}
            />
            <button onClick={handleSearch}>
                <FaSearch size={34} className='bg-red-400 text-white p-2 cursor-pointer mx-2 rounded-full' />
            </button>
        </div>
    )
}

export default Search