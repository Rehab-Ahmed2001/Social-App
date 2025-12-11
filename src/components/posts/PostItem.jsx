import React from 'react'
import { Avatar, Card } from "flowbite-react";
import { AiFillLike } from "react-icons/ai";
import { FaBookOpen, FaComment, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom"
import HeaderPostAndComment from './HeaderPostAndComment';

export default function PostItem({ post, showAllComments = false }) {

    const { body, image, createdAt, user, comments, _id } = post
    return (
        <Card>
            {/* header */}
            <HeaderPostAndComment user={{ ...user, createdAt, body }} />
            {/* contant */}
            <img src={image} alt={body} />

            {/* footer */}

            <footer className='flex justify-between items-center'>
                <AiFillLike />
                <div className="flex items-center gap-2">
                    <FaComment className="text-xl" />
                    <span>{comments?.length || 0}</span>
                </div>

                <FaShare />
                <Link to={`/posts/${_id}`}>
                    <FaBookOpen />
                </Link>

            </footer>
            {/* comments */}
            {comments && comments.length > 0 ? (
                showAllComments ? (
                    comments.map((comment) => (
                        <HeaderPostAndComment
                            key={comment._id}
                            user={{
                                ...comment.commentCreator,
                                createdAt: comment.createdAt,
                                body: comment.content
                            }}
                            isComment={true}
                        />
                    ))
                ) : (
                    <HeaderPostAndComment
                        user={{
                            ...comments[0].commentCreator,
                            createdAt: comments[0].createdAt,
                            body: comments[0].content
                        }}
                        isComment={true}
                    />
                )
            ) : null}

        </Card >
    )
}
