import React, { useContext } from 'react';
import PostItem from './PostItem';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { useQuery } from '@tanstack/react-query'
export default function PostsList({ isHome = true }) {

    const { userData } = useContext(AuthContext)
    const { data, isLoading, isError, error } = useQuery({
        queryKey: isHome ? ['all-posts'] : ["profile-posts"], queryFn: getPosts, staleTime: 1000 * 6,
        refetchOnReconnect: false,
    })

    console.log({ data, isLoading, isError, error });

    async function getPosts() {
        const apiUrl = isHome ? `${import.meta.env.VITE_BASE_URL}/posts?limit=20&sort=-createdAt` : `${import.meta.env.VITE_BASE_URL}/users/${userData._id}/posts`
        return axios.get(apiUrl, {
            headers: {
                token: localStorage.getItem("token"),
            },
        })
    }


    return (
        <section className='py-12'>
            <div className='max-w-3xl mx-auto'>
                <div className='flex flex-col gap-6'>

                    {isLoading && (
                        <div className='text-center text-2xl'>Loading...</div>
                    )}

                    {isError && (
                        <p className="text-red-500 text-center">{error}</p>
                    )}

                    {data && data.data.posts.map(post => (
                        <PostItem key={post._id} post={post} />
                    ))}

                </div>
            </div>
        </section>
    );
}
