import React from "react";
import { Card } from "flowbite-react";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import HeaderPostAndComment from "./HeaderPostAndComment";
import AddComment from "./AddComment";
import CommentItem from "./CommentItem";

export default function PostItem({ post, showAllComments = false }) {
  const { body, image, createdAt, user, comments = [], _id } = post;

  return (
    <Card>
      {/* header */}
      <HeaderPostAndComment
        user={user}
        createdAt={createdAt}
        body={body}
      />

      {/* content */}
      {image && <img src={image} alt={body} />}

      {/* footer */}
      <footer className="flex justify-between items-center">
        <AiFillLike />

        <Link to={`/posts/${_id}`}>
          <div className="flex items-center gap-2">
            <FaComment className="text-xl" />
            <span>{comments.length}</span>
          </div>
        </Link>

        <FaShare />
      </footer>

      {/* comments */}
      <CommentItem
        comments={comments}
        showAllComments={showAllComments}
        postId={_id}
      />

      {/* add comment */}
      <AddComment post={_id} />
    </Card>
  );
}
