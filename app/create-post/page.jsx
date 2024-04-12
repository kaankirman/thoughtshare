"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submit, setSubmit] = useState(false);
  const [post, setPost] = useState({
    content: "",
    tag: "",
  });

  const createPost = async (e) => {
    e.preventDefault();
    setSubmit(true);

    try {
      const response = await fetch("/api/post/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: post.content,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submit={submit}
      handleSubmit={createPost}
    />
  );
};

export default CreatePost;
