'use client'

import { Pagination } from 'flowbite-react'
import React, { useState } from 'react'

type Props = {
    currentPage: number;
    pageCount: number;
    pageChanged: (page: number) => void
}

const AppPagination = ({ currentPage, pageCount, pageChanged }: Props) => {

    const handleChangePageNumber = (e: number) => {
        console.log(e)
        pageChanged(e)
    }

    return (
        <Pagination
            currentPage={currentPage}
            totalPages={pageCount}
            onPageChange={handleChangePageNumber}
            layout='pagination'
            showIcons={true}
            className='text-blue-500 mb-5'
        />
    )
}

export default AppPagination