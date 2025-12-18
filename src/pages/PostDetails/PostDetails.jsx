import { useParams } from 'react-router-dom'
import PostItem from '../../components/posts/PostItem';
import useFetch from '../../hooks/useFetch.js';
import { AuthContext } from '../../Context/AuthContext.jsx';
import { useContext } from 'react';

export default function PostDetails() {
    const { id } = useParams();
    console.log(id);
    const { userData } = useContext(AuthContext)
    const { data, isLoading, isError, error } = useFetch(["details-post", id], `posts/${id}`, userData)

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
                    {data && <PostItem
                        post={data.post}
                        showAllComments={true} />}
                </div>
            </div>
        </section>
    )
}
