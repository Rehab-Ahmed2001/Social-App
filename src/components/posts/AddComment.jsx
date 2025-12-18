import { Textarea } from 'flowbite-react'
import React from 'react'
import AppButton from '../shared/AppButton/AppButton'
import { useForm } from 'react-hook-form'
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
const schema = z.object({
    content: z
        .string()
        .min(1, "Comment is required")
        .max(500, "Comment must be less than 500 characters"),
});
export default function AddComment({ post }) {

    const { register, handleSubmit, reset, formState: { isSubmitting, isValid } } = useForm({
        resolver: zodResolver(schema), mode: "onChange"
    })
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: addComment,
        onSuccess: (data) => {
            console.log(data);
            reset()
            toast.success("Comment created successfully", {

                position: "top-center",
                theme: "dark",

            })
            queryClient.invalidateQueries({
                queryKey: ["details-post", post._id],
            });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Comment creation failed", {

                position: "top-center",
                theme: "dark",

            })
        }
    })
    async function addComment(data) {
        console.log(data);
        const commentData = { ...data, post }
        return await axios.post(`${import.meta.env.VITE_BASE_URL}/comments`,
            commentData, {
            headers: {
                token: localStorage.getItem("token")
            }
        })

    }

    return (
        <form onSubmit={handleSubmit(mutate)}
            className="flex flex-col gap-4">
            <Textarea
                {...register("content")}

                id="comment"
                placeholder="Leave a comment..."
                rows={2} />
            <AppButton
                isloading={isSubmitting}
                disabled={!isValid}
            >
                Add comment
            </AppButton>
        </form>
    )
}
