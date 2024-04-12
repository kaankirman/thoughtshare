import { connectToDatabase } from "@utils/database";
import { Post } from "@models/post";

export const POST = async (req) => {
    const { userId, content, tag } = await req.json();

    try {
        await connectToDatabase();
        const newPost = new Post({
            creator: userId,
            content,
            tag
        });

        await newPost.save();
        return new Response(JSON.stringify(newPost), { status: 200 })
    } catch (error) {
        return new Response("An unexpected error happened:", error, { status: 500 });

    }
}