import axios from 'axios'
import { useParams } from 'react-router-dom'
import PostItem from '../../components/posts/PostItem';
import { useQuery } from '@tanstack/react-query';

export default function PostDetails() {
    const { id } = useParams();
    console.log(id);

    const { data, isLoading, isError, error } = useQuery({ queryKey: ["details-post", id], queryFn: getPosts })

    console.log({ data, isLoading, isError, error });

    async function getPosts() {
        const apiUrl = `${import.meta.env.VITE_BASE_URL}/posts/${id}`
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
                    {data && <PostItem
                        post={data.data.post}
                        showAllComments={true} />}
                </div>
            </div>
        </section>
    )
}
