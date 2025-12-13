import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import axios from 'axios';

export default function PostsList() {
    const [posts, setPosts] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getPosts() {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/posts`,
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            )
            if (Array.isArray(res.data.posts)) {
                setPosts(res.data.posts);
            } else {
                setPosts([]);
                setError(res.data?.message || "Unexpected response from server");
            }

        } catch (err) {
            console.error("GET POSTS ERROR:", err.response?.data || err.message);
            setPosts([]);
            setError(err.response?.data?.message || "Failed to load posts");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <section className='py-12'>
            <div className='max-w-3xl mx-auto'>
                <div className='flex flex-col gap-6'>

                    {isLoading && (
                        <div className='text-center text-2xl'>Loading...</div>
                    )}

                    {error && (
                        <p className="text-red-500 text-center">{error}</p>
                    )}

                    {!isLoading && posts.length === 0 && !error && (
                        <p className="text-center text-gray-500">No posts found</p>
                    )}

                    {posts.map((post) => (
                        <PostItem key={post._id} post={post} />
                    ))}

                </div>
            </div>
        </section>
    );
}

