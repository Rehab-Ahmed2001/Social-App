import React, { useContext } from 'react';
import PostItem from './PostItem';
import { AuthContext } from '../../Context/AuthContext';
import useFetch from '../../hooks/useFetch.js';
import Skeleton from 'react-loading-skeleton';
export default function PostsList({ isHome = true }) {
    const { userData } = useContext(AuthContext);
    const queryKey = isHome ? ['all-posts'] : ['profile-posts'];
    const apiUrl = isHome ? `posts?sort=-createdAt` : userData?._id ? `users/${userData._id}/posts` : null;

    const { data, isLoading, isError, error } = useFetch(queryKey, apiUrl, userData);

    if (!isHome && !userData) {
        return <Skeleton className='h-96 mb-4' baseColor='#1F2837' highlightColor='#111827' count={5} />;
    }

    return (
        <section className='py-4'>
            <div className='max-w-3xl mx-auto'>
                <div className='flex flex-col gap-6'>
                    {isLoading && <Skeleton className='h-96 mb-4' baseColor='#1F2837' highlightColor='#111827' count={5} />}
                    {isError && <p className="text-red-500 text-center">{error}</p>}
                    {data &&
                        [...data.posts]
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map(post => <PostItem key={post._id} post={post} />)}
                </div>
            </div>
        </section>
    );
}
