'use server'

import { fetchWrapper } from "@/lib/fetchWrapper"
import { Auction, PagedResult } from "../types"
import { getTokenWorkaround } from "./authActions"
import { FieldValues } from "react-hook-form"
import { revalidatePath } from "next/cache"

export async function getData(query: string): Promise<PagedResult<Auction>> {
    return await fetchWrapper.get('search/' + query)
}


export const updateAuctionTest = async () => {
    const data = {
        mileage: Math.floor(Math.random() * 10000) + 1
    }

    // const token = await getTokenWorkaround()

    // const res = await fetch('http://localhost:6001/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c', {
    //     method: "PUT",
    //     headers: {
    //         'Content-type': "application/json",
    //         'Authorization': "Bearer " + token?.access_token
    //     },
    //     body: JSON.stringify(data)
    // })

    // if (res.ok) return { status: res.status, message: res.statusText }

    // return res.statusText
    return await fetchWrapper.put('auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c', data)
}

export const createAuction = async (data: FieldValues) => {
    return await fetchWrapper.post('auctions', data)
}


export const getDetailViewData = async (id: string): Promise<Auction> => {
    return await fetchWrapper.get(`auctions/${id}`)
}

export const updateAuction = async (data: FieldValues, id: string) => {
    const res = await fetchWrapper.put(`auctions/${id}`, data)
    revalidatePath(`/auctions/${id}`)
    return res;
}
