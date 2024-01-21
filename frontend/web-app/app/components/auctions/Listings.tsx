'use client'

import AuctionCard from "./AuctionCard"
import AppPagination from "../AppPagination"
import { getData } from "@/app/actions/auctionActions"
import { useEffect, useState } from "react"
import { Auction, PagedResult } from "@/app/types"
import Filter from "./Filter"
import { useParamsStore } from "@/hooks/useParamsStore"
import { shallow } from "zustand/shallow"
import qs from 'query-string'
import EmptyFilter from "../EmptyFilter"


const Listings = () => {
    const [data, setData] = useState<PagedResult<Auction>>();
    const params = useParamsStore((state) => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy,
        seller: state.seller,
        winner: state.winner
    }), shallow)

    const setParams = useParamsStore(state => state.setParams)
    const url = qs.stringifyUrl({ url: '', query: params })

    const setPageNumberCustom = (pageNumber: number) => {
        setParams({ pageNumber })
    }

    const getAuctions = async (): Promise<PagedResult<Auction>> => {
        const data = await getData(url)
        return data
    }

    useEffect(() => {
        getAuctions().then(data => {
            setData(data)
        })
    }, [url])

    if (data?.results.length === 0) return <EmptyFilter showReset />

    if (data?.totalCount === 0) return <EmptyFilter showReset />

    return (
        <>
            <Filter />

            <div className="grid grid-cols-4 gap-6">
                {data?.results && data.results.map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <AppPagination pageChanged={setPageNumberCustom} currentPage={params.pageNumber} pageCount={data?.pageCount ?? 2} />
            </div>
        </>
    )
}

export default Listings