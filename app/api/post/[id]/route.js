import { connectToDatabase } from "@utils/database";
import { Post } from "@models/post";

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();
        const post = await Post.findById(params.id).populate('creator');
        if (!post) {
            return new Response("Post not found", {
                status: 404
            })
        }
        return new Response(JSON.stringify(post), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch posts", {
            status: 500
        })
    }
}

export const PATCH = async (request, { params }) => {
    const { content, tag } = await request.json();
    try {
        await connectToDatabase();

        const existingPost = await Post.findById(params.id);
        if (!existingPost) {
            return new Response("Post not found", {
                status: 404
            })
        }
        existingPost.content = content;
        existingPost.tag = tag;
        await existingPost.save();
        return new Response(JSON.stringify(existingPost), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to update post", {
            status: 500
        })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDatabase();

        await Post.findByIdAndDelete(params.id);
        return new Response("Post deleted successfully", {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to delete post", {
            status: 500
        })
    }
}