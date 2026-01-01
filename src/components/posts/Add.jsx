import React, { useRef } from 'react'
import { Button, Card, Label, Textarea } from "flowbite-react";
import { useForm } from "react-hook-form"
import { IoMdCloudUpload } from "react-icons/io";
import axios from 'axios';
import AppButton from '../shared/AppButton/AppButton';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAddSchema } from '../../schema/postAdd.schema';


export default function Add() {
    const fileInputRef = useRef()
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
            reset()
            toast.success("Post created successfully", {

                position: "top-center",
                theme: "dark",

            })
            queryClient.invalidateQueries(["profile-posts"]);
            queryClient.invalidateQueries(["all-posts"]);
        },
        onError: (error) => {
            console.log(error);
            toast.error("Post creation failed", {

                position: "top-center",
                theme: "dark",

            })
        }
    })

    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } = useForm({
        resolver: zodResolver(postAddSchema),
        mode: "onChange"
    });

    async function addPost(data) {
        console.log(data.body, fileInputRef.current.files[0]);
        const formData = new FormData()
        formData.append("body", data.body)
        if (fileInputRef.current.files[0]) {
            formData.append("image", fileInputRef.current.files[0])
        }


        return await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`,
            formData, {
            headers: {
                token: localStorage.getItem("token")
            }
        })

    }
    return (
        <section className='py-6'>
            <div className='max-w-3xl mx-auto'>

                <Card className="">
                    <form onSubmit={handleSubmit(mutate)}
                        className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="comment">Post something</Label>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <Textarea
                                {...register("body")}
                                name='body'
                                id="comment"
                                placeholder="Leave a comment..."
                                rows={2} />
                            <input
                                {...register("image")}
                                className='hidden'
                                ref={fileInputRef}
                                type='file'
                            />


                            <IoMdCloudUpload onClick={() => fileInputRef.current.click()} className='text-4xl cursor-pointer' />
                        </div>
                        {errors.body && (
                            <p className="text-red-500 text-sm">{errors.body.message}</p>
                        )}

                        <AppButton
                            isloading={isSubmitting}
                            disabled={!isValid}
                        >
                            Create post
                        </AppButton>
                    </form>
                </Card>

            </div>
        </section>
    )
}
