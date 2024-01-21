'use client'

import { Button, TextInput } from 'flowbite-react';
import React, { useEffect } from 'react'
import { FieldValue, FieldValues, useForm } from 'react-hook-form'
import Input from '../input';
import DateInput from '../DateInput';
import { createAuction, updateAuction } from '@/app/actions/auctionActions';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Auction } from '@/app/types';

type Props = {
    auction?: Auction
}

const AuctionForm = ({ auction }: Props) => {
    const router = useRouter()
    const pathname = usePathname()
    const { reset, control, handleSubmit, setFocus, formState: { isSubmitting, isValid, isDirty, errors } } = useForm({
        mode: 'onTouched'
    });

    const handleOnSubmit = async (data: FieldValues) => {
        try {
            let id = ''
            let res;

            if (pathname === '/auctions/create') {
                res = await createAuction(data)
                id = res.id
            } else {
                if (auction) {
                    res = await updateAuction(data, auction.id)
                    id = auction.id
                }
            }

            if (res.error) {
                throw new Error(res.error)
            }

            router.push(`/auctions/details/${id}`)

        } catch (e: any) {
            console.log("ERROR💣💣💣💣 : ", JSON.parse(e))
            toast.error(e.status + ' ' + e.message)
        }
    }

    useEffect(() => {
        if (auction) {
            const { make, model, color, mileage, year } = auction
            reset({ make, model, color, mileage, year })
        }
        setFocus('make')
    }, [setFocus])

    return (
        <form className='flex flex-col mt-3' onSubmit={handleSubmit(handleOnSubmit)}>
            <Input label='Make' name='make' control={control} rules={{ required: 'Make is required' }} />
            <Input label='Model' name='model' control={control} rules={{ required: 'Model is required' }} />
            <Input label='Color' name='color' control={control} rules={{ required: 'Color is required' }} />
            <div className='grid grid-cols-2 gap-3'>
                <Input label='Year' type='number' name='year' control={control} rules={{ required: 'Year is required' }} />
                <Input label='Mileage' type='number' name='mileage' control={control} rules={{ required: 'Mileage is required' }} />
            </div>
            {pathname === '/auctions/create' && (
                <>
                    <Input label='Image URL' name='imageUrl' control={control} rules={{ required: 'Image Url is required' }} />
                    <div className='grid grid-cols-2 gap-3'>
                        <Input label='Reserve Price (enter 0 if no reserve' type='number' name='reservePrice' control={control} rules={{ required: 'Reserved Price is required' }} />
                        <DateInput label='Auction end date/time' name='auctionEnd' control={control} rules={{ required: 'Auction End is required' }} />
                    </div>
                </>
            )}
            <div className="flex justify-between">
                <Button outline color='gray'>Cancel</Button>
                <Button outline color='success' isProcessing={isSubmitting} disabled={!isValid} type='submit'>Submit</Button>
            </div>
        </form>
    )
}

export default AuctionForm