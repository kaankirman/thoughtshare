import { connectToDatabase } from "@utils/database";
import { Post } from "@models/post";

export const GET = async (request) => {
    try {
        await connectToDatabase();
        const posts = await Post.find({}).populate('creator');
        return new Response(JSON.stringify(posts), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch posts", {
            status: 500
        })
    }
}
