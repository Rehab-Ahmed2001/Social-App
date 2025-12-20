import { Avatar, Dropdown, DropdownItem } from 'flowbite-react'
import React, { useContext } from 'react'
import { formateDate } from '../../lib/formateDate'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';

export default function HeaderPostAndComment({
    user: { name, photo, createdAt, _id },
    mediaId, body,
    isComment, setIsEditing
}) {
    const { userData } = useContext(AuthContext)
    const queryClient = useQueryClient()
    const { mutate: handleDeletePost } = useMutation({
        mutationFn: deletepost,
        onSuccess: () => {
            toast.success(
                isComment ? "Comment deleted successfully" : "Post deleted successfully",
                {
                    position: "top-center",
                    theme: "dark",
                }
            );

            // posts
            queryClient.invalidateQueries(["profile-posts"]);
            queryClient.invalidateQueries(["all-posts"]);


            // comment
            if (isComment) {
                queryClient.invalidateQueries(["profile-posts"]);
                queryClient.invalidateQueries(["all-posts"]);
                queryClient.invalidateQueries(["details-post"]);
            }
        },
        onError: () => {
            toast.error("Delete failed", {
                position: "top-center",
                theme: "dark",
            });
        },
    });


    async function deletepost() {
        const endPoint = isComment ? "comments" : "posts"
        return await axios.delete(`${import.meta.env.VITE_BASE_URL}/${endPoint}/${mediaId}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
    }
    return (
        <section className='flex items-start justify-between'>
            <div>
                <header className='flex items-center'>
                    <Avatar alt={name} img={photo} rounded className='me-4' />
                    <div>
                        <h2 className='text-lg font-bold text-gray-900 dark:text-white'>
                            {name}
                        </h2>
                        <span>{formateDate(createdAt)}</span>
                    </div>
                </header>

                {body && (
                    <h2
                        className={`text-lg font-bold text-gray-900 dark:text-white ${isComment ? "ps-16" : ""
                            }`}
                    >
                        {body}
                    </h2>
                )}
            </div>
            {userData?._id === _id && (
                <div className="flex justify-end px-4 pt-4">
                    <Dropdown inline label="">
                        <DropdownItem onClick={() => setIsEditing(true)}>
                            Edit
                        </DropdownItem>
                        <DropdownItem onClick={handleDeletePost}>
                            Delete
                        </DropdownItem>
                    </Dropdown>
                </div>
            )}
        </section>
    );
}
