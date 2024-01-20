
import React from 'react'
import { getSession, getTokenWorkaround } from '../actions/authActions'
import Heading from '../components/Heading';
import Authtest from './Authtest';

const Session = async () => {
    const session = await getSession();
    const token = await getTokenWorkaround();

    return (
        <div>
            <Heading title='Session dashaboard' />
            <div className='bg-blue-200 border-blue-500 border-2'>
                <h3 className='text-lg'>Session Data</h3>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
            <div className="mt-4">
                <Authtest />
            </div>
            <div className='bg-green-200 border-green-500 border-2 mt-4'>
                <h3 className='text-lg'>Token Data</h3>
                <pre className='overflow-auto'>{JSON.stringify(token, null, 2)}</pre>
            </div>
        </div>
    )
}

export default Session