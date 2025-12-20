import { Card, Textarea } from 'flowbite-react'
import React, { useState } from 'react'

import HeaderPostAndComment from './HeaderPostAndComment'
import AppButton from '../shared/AppButton/AppButton'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function CommentItem({ comment }) {
    const [isEditing, setIsEditing] = useState(false)
    const { handleSubmit, register } = useForm()
    const queryClient = useQueryClient()
    const { mutate: handleUpdateComment } = useMutation({
        mutationFn: updateComment,
        onSuccess: () => {
            toast.success("Comment updated successfully",
                {
                    position: "top-center",
                    theme: "dark",
                }
            );
            setIsEditing(false)
            queryClient.invalidateQueries(["profile-posts"]);
            queryClient.invalidateQueries(["all-posts"]);

        },
        onError: () => {
            toast.error("Comment updating failed", {
                position: "top-center",
                theme: "dark",
            });
        },
    });

    async function updateComment(data) {
        console.log(data);
        return await axios.put(`${import.meta.env.VITE_BASE_URL}/comments/${comment._id}`, data, {
            headers: {
                token: localStorage.getItem("token")
            }
        })

    }
    return (
        <Card>
            {/* header */}
            <HeaderPostAndComment user={{ ...comment.commentCreator, createdAt: comment.createdAt }}
                mediaId={comment._id}
                isComment={true}
                setIsEditing={setIsEditing} />
            {isEditing ?
                (<form onSubmit={handleSubmit(handleUpdateComment)}>
                    <Textarea defaultValue={comment.content}{...register("content")} />
                    <div className='flex gap-2 mt-4'>
                        <AppButton type="submit">Update</AppButton>
                        <AppButton type="reset" onClick={() => setIsEditing(false)}>Cancel</AppButton>
                    </div>
                </form>)
                :
                (<h3 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    {comment.content}
                </h3>)
            }
        </Card >
    )
}
