import mongoose, { Schema, model, models } from "mongoose";

const postSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required']
    },
});

export const Post = models.Post || model('Post', postSchema);

