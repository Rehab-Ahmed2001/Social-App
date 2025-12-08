import React, { useEffect, useState } from 'react'
import PostItem from './PostItem'
import axios from 'axios';

export default function PostsList() {
    const [posts, setPosts] = useState(null)
    async function getPosts() {
        try {
            const { data: { posts } } = await axios.get("https://linked-posts.routemisr.com/posts", {
                headers: { token: localStorage.getItem("token") }
            })
            setPosts(posts)


        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getPosts()
    }, [])
    return (
        <section className='py-12'>
            <div className='max-w-3xl mx-auto'>
                <div className='flex flex-col gap-6'>
                    {posts && posts.map((post) => <PostItem key={post._id} post={post} />)}
                </div>
            </div>
        </section>
    )
}
