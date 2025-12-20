import React, { useState, useRef, useEffect } from "react";
import { Card, Textarea } from "flowbite-react";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import HeaderPostAndComment from "./HeaderPostAndComment";
import AddComment from "./AddComment";
import CommentItem from "./CommentItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import AppButton from "../shared/AppButton/AppButton";
import { IoMdCloudUpload } from "react-icons/io";

export default function PostItem({ post, showAllComments = false }) {
  const { body, image, createdAt, user, comments, _id } = post;
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(body);
  const [editedImage, setEditedImage] = useState(null);
  const [editedImagePreview, setEditedImagePreview] = useState(null);

  const fileInputRef = useRef();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (editedImage) {
      const reader = new FileReader();
      reader.onloadend = () => setEditedImagePreview(reader.result);
      reader.readAsDataURL(editedImage);
    } else {
      setEditedImagePreview(null);
    }
  }, [editedImage]);

  const { mutate: handleUpdatePost } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      toast.success("Post updated successfully", {
        position: "top-center",
        theme: "dark",
      });
      setIsEditing(false);
      queryClient.invalidateQueries(["all-posts"]);
      queryClient.invalidateQueries(["profile-posts"]);
    },
    onError: () => {
      toast.error("Post update failed", {
        position: "top-center",
        theme: "dark",
      });
    },
  });

  async function updatePost() {
    const formData = new FormData();
    formData.append("body", editedBody);
    if (editedImage) formData.append("image", editedImage);

    return axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${_id}`, formData, {
      headers: { token: localStorage.getItem("token") },
    });
  }

  return (
    <Card>
      {/* header */}
      <HeaderPostAndComment
        user={{ ...user, createdAt }}
        mediaId={_id}
        body={body}
        isComment={false}
        setIsEditing={setIsEditing}
      />

      {/* content */}
      {isEditing ? (
        <Card className="bg-gray-800 mt-2">
          <div className='flex items-center gap-4'>
            <Textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              rows={3}
              className="mb-2"
              placeholder="Edit your post..." />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => setEditedImage(e.target.files[0])}
            />


            <IoMdCloudUpload onClick={() => fileInputRef.current.click()} className='text-4xl cursor-pointer' />
          </div>
          {(editedImagePreview || image) && (
            <img
              src={editedImagePreview || image}
              alt="Post"
              className="w-full max-h-64 object-cover rounded mb-2"
            />
          )}

          <div className="flex gap-2">
            <AppButton onClick={() => handleUpdatePost()}>Update</AppButton>
            <AppButton onClick={() => setIsEditing(false)}>Cancel</AppButton>
          </div>
        </Card>
      ) : (
        <>
          {image && <img src={image} alt={body} className="w-full rounded mb-2" />}
        </>
      )}

      {!isEditing && (
        <>
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
          {comments && comments.length > 0 &&
            (showAllComments
              ? comments.map((comment) => <CommentItem key={comment._id} comment={comment} />)
              : <CommentItem key={comments[comments.length - 1]._id} comment={comments[comments.length - 1]} />
            )
          }

          {/* add comment */}
          <AddComment post={_id} />
        </>
      )}
    </Card>
  );
}
