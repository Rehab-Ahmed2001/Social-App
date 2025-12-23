import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Avatar, Card, Button } from "flowbite-react";
import { AiFillLike, AiOutlineMessage } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";

export default function FriendProfile() {
    const { state: friend } = useLocation();
    const [mutualFriends] = useState([
        { id: 1, name: "Alice", picture: "https://randomuser.me/api/portraits/women/68.jpg" },
        { id: 2, name: "Bob", picture: "https://randomuser.me/api/portraits/men/75.jpg" },
        { id: 3, name: "Charlie", picture: "https://randomuser.me/api/portraits/men/32.jpg" }
    ]);

    if (!friend) return <p className="text-center mt-10">Friend not found</p>;

    return (
        <section className="max-w-5xl mx-auto mt-10 px-4">
            <Card className="flex flex-col items-center gap-6 p-8">

                <Avatar img={friend.picture.large} rounded size="2xl" />

                <h2 className="text-4xl text-center font-bold">{friend.name.first} {friend.name.last}</h2>

                <div className="flex flex-col items-center text-center mt-2">
                    <p className="text-lg text-gray-600">{friend.email}</p>
                    <p className="text-md text-gray-400">Country: {friend.location.country}</p>
                </div>

                <div className="flex gap-4 mt-4">
                    <Button color="gray" size="md" className="flex items-center gap-2">
                        <AiFillLike /> Like
                    </Button>
                    <Button color="info" size="md" className="flex items-center gap-2">
                        <AiOutlineMessage /> Message
                    </Button>
                    <Button color="success" size="md" className="flex items-center gap-2">
                        <FaUserPlus /> Follow
                    </Button>
                </div>

                

                <Card className="w-full mt-6 p-4">
                    <h3 className="text-2xl font-semibold mb-4">Mutual Friends</h3>
                    <div className="flex gap-4 flex-wrap">
                        {mutualFriends.map(friend => (
                            <div key={friend.id} className="flex flex-col items-center w-24">
                                <Avatar img={friend.picture} rounded size="lg" />
                                <span className="mt-2 text-sm text-center">{friend.name}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </Card>
        </section>
    );
}
