"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setUserPosts(data);
    };
    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-post?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");

    if (confirmDelete) {
      try {
        await fetch(`/api/post/${post._id.toString()}`, {
          method: "DELETE",
        });

        const updatedPosts = userPosts.filter((p) => p._id !== post._id);
        setUserPosts(updatedPosts);
      } catch (error) {
        console.error("Error deleting post", error);
      }
    }
  };

  return (
    <Profile
      name="My"
      description="Welcome to your profile"
      data={userPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
