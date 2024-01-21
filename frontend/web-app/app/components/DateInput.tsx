import { Label, TextInput } from 'flowbite-react';
import React from 'react'
import { UseControllerProps, useController } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

type Props = {
    label: string;
    type?: string;
    showLabel?: string;
} & UseControllerProps & Partial<ReactDatePickerProps>

const DateInput = (props: Props) => {
    const { field, fieldState, formState } = useController({ ...props, defaultValue: '' })

    return (
        <div className='block'>
            <ReactDatePicker
                {...props}
                {...field}
                onChange={(value) => field.onChange(value)}
                selected={field.value}
                placeholderText={props.label}
                dateFormat={'dd MMMM yyyy h:mm a'}
                showTimeSelect
                className={`
                    rounded-lg w-[100%] flex flex-col
                    ${fieldState.error ? 'bg-red-50 border-red-500 text-red-900' : (!fieldState.invalid && fieldState.isDirty)
                        ? 'bg-green-50 border-gree-500 text-green-900' : ''}
                `}
            />
            {fieldState.error && (
                <div className='text-red-500 text-sm'>{fieldState.error.message}</div>
            )}
        </div>
    )
}

export default DateInput 