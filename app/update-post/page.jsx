"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const [submit, setSubmit] = useState(false);
  const [post, setPost] = useState({
    content: "",
    tag: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/post/${postId}`);
      const data = await res.json();
      setPost({
        content: data.content,
        tag: data.tag,
      });
    };
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const updatePost = async (e) => {
    e.preventDefault();
    setSubmit(true);

    if (!postId) {
      return alert("Post not found");
    }

    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: post.content,
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
    <Suspense fallback={<div>Loading...</div>}>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submit={submit}
        handleSubmit={updatePost}
      />
    </Suspense>
  );
};

export default EditPost;
