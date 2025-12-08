import React from 'react'
import { Button, Card, Label, Textarea } from "flowbite-react";

import { IoMdCloudUpload } from "react-icons/io";

export default function Add() {
    return (
        <section className='py-6'>
            <div className='max-w-3xl mx-auto'>

                <Card className="">
                    <form className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="comment">Post something</Label>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <Textarea
                                id="comment"
                                placeholder="Leave a comment..."
                                required
                                rows={2} />
                            <IoMdCloudUpload className='text-4xl cursor-pointer' />
                        </div>

                        <Button type="submit">Create post</Button>
                    </form>
                </Card>

            </div>
        </section>
    )
}
