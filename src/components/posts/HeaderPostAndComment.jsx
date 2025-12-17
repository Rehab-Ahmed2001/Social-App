import { Avatar } from 'flowbite-react'
import React from 'react'
import { formateDate } from '../../lib/formateDate'

export default function HeaderPostAndComment({
    user,
    createdAt,
    body,
    isComment = false
}) {
    const { name, photo } = user;

    return (
        <section>
            <header className='flex items-center'>
                <Avatar alt={name} img={photo} rounded className='me-4' />
                <div>
                    <h2 className='text-lg font-bold text-gray-900 dark:text-white'>
                        {name}
                    </h2>
                    <span>{formateDate(createdAt)}</span>
                </div>
            </header>

            {body && (
                <h2
                    className={`text-lg font-bold text-gray-900 dark:text-white ${isComment ? "ps-16" : ""
                        }`}
                >
                    {body}
                </h2>
            )}
        </section>
    );
}
