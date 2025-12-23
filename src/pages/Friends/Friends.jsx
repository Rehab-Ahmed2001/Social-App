import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Card, TextInput } from "flowbite-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

async function getFriends() {
  const res = await fetch("https://randomuser.me/api/?results=21");
  if (!res.ok) throw new Error("Failed to fetch friends");
  return res.json();
}

export default function Friends() {
  const { userData } = useContext(AuthContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Kudo | Friends";
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  // 🔗 Add friend → backend
  const { mutate: addFriend } = useMutation({
    mutationFn: (friend) =>
      axios.post(
        `${import.meta.env.VITE_BASE_URL}/friends`,
        friend,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      ),
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  const friends = data.results.filter((friend) =>
    `${friend.name.first} ${friend.name.last}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  return (
    <section className="max-w-5xl mx-auto mt-10 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Friends
        </h2>

        <TextInput
          placeholder="Search friends..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64"
        />
      </div>

      {/* Friends */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {friends.map((friend) => (
          <Card key={friend.login.uuid} className="text-center">
            <Avatar
              img={friend.picture.large}
              rounded
              size="lg"
              className="mx-auto"
            />

            <h5 className="mt-4 text-lg font-semibold">
              {friend.name.first} {friend.name.last}
            </h5>

            <p className="text-sm text-gray-500 mb-4">
              {friend.email}
            </p>

            <div className="flex justify-center gap-3">
              {/* Profile */}
              <Link to={`/friends/${friend.login.uuid}`} state={friend}>
                <Button size="sm" gradientMonochrome="info">
                  Profile
                </Button>
              </Link>

              {/* Chat */}
              <Link to={`/chat/${friend.login.uuid}`}>
                <Button size="sm" color="gray">
                  Chat
                </Button>
              </Link>

              {/* Add Friend */}
              <Button
                size="sm"
                color="success"
                onClick={() =>
                  addFriend({
                    friendId: friend.login.uuid,
                    name: `${friend.name.first} ${friend.name.last}`,
                    photo: friend.picture.large,
                    userId: userData._id,
                  })
                }
              >
                Add
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
