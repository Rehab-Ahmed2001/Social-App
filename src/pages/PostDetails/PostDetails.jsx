import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostItem from '../../components/posts/PostItem';

export default function PostDetails() {
    const { id } = useParams();
    console.log(id);

    const [post, setPost] = useState(null)
    async function getPost() {
        try {
            const { data: { post } } = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
                headers: { token: localStorage.getItem("token") }
            })
            setPost(post)
            console.log(post);

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getPost()
    }, []);

    return (
        <section className='py-12'>
            <div className='max-w-3xl mx-auto'>
                <div className='flex flex-col gap-6'>
                    {post && <PostItem
                        post={post}
                        showAllComments={true} />}
                </div>
            </div>
        </section>
    )
}
