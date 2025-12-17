import { Card } from 'flowbite-react'
import React from 'react'

import HeaderPostAndComment from './HeaderPostAndComment'

export default function CommentItem({ comment }) {
    return (
        <Card>
            {/* header */}
            <HeaderPostAndComment user={{ ...comment.commentCreator, createdAt: comment.createdAt }} />
            <h3 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                {comment.content}
            </h3>
        </Card>
    )
}
