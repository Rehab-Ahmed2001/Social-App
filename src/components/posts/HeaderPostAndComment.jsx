import { Avatar } from 'flowbite-react'
import React from 'react'
import { formateDate } from '../../lib/formateDate'

export default function HeaderPostAndComment({ user: { name, photo, createdAt, body }, isComment = false }) {
    return (
        <section>
            <header className='flex items-center '>
                <picture>
                    <Avatar
                        alt={name}
                        img={photo}
                        rounded
                        className='me-4'
                    />
                </picture>
                <div>
                    <h2 className='text-lg mb-0 font-bold tracking-tight text-gray-900 dark:text-white'>
                        {name}
                    </h2>
                    <span>
                        {formateDate(createdAt)}
                    </span>
                </div>
            </header>
            <h2 className={`text-lg font-bold tracking-tight text-gray-900 dark:text-white ${isComment ? "ps-16" : ""} `}>
                {body}
            </h2>
        </section>

    )
}
