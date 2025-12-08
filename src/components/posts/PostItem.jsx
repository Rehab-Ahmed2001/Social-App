import React from 'react'
import { Avatar, Card } from "flowbite-react";

export default function PostItem({ post }) {

    const { body, image, createdAt, user: { _id, name, photo }, comments } = post
    return (
        <Card>
            {/* header */}
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
                        {createdAt}
                    </span>
                </div>
            </header>

            {/* contant */}
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {body}
            </h3>
            <img src={image} alt={body} />

            {/* footer */}


            {/* comments */}
        </Card>
    )
}
