import React from "react";
import { Link } from "react-router-dom";
import HeaderPostAndComment from "./HeaderPostAndComment";

export default function CommentItem({
    comments = [],
    showAllComments = false,
    postId,
}) {
    if (comments.length === 0) return null;

    const lastComment = comments[comments.length - 1];

    return (
        <>
            {showAllComments ? (
                comments.map((comment) => (
                    <HeaderPostAndComment
                        key={comment._id}
                        user={comment.commentCreator}
                        createdAt={comment.createdAt}
                        body={comment.content}
                        isComment={true}
                    />
                ))
            ) : (
                <>
                    <HeaderPostAndComment
                        user={lastComment.commentCreator}
                        createdAt={lastComment.createdAt}
                        body={lastComment.content}
                        isComment={true}
                    />

                    {comments.length > 1 && (
                        <Link
                            to={`/posts/${postId}`}
                            className="text-blue-500 text-sm ps-16 hover:underline"
                        >
                            Show more comments
                        </Link>
                    )}
                </>
            )}
        </>
    );
}
