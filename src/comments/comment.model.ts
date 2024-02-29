import { Schema, Document, Types } from 'mongoose';

export interface Comment extends Document {
    id: string;
    content: string;
    postId: string;
}

export const CommentSchema = new Schema<Comment>(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        content: { type: String, required: true },
        postId: { type: String, required: true }, // Usar ObjectId para postId
    },
    { timestamps: true }
);
