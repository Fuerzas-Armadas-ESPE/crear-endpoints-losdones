import { Schema, Document } from 'mongoose';

export interface Comment extends Document {
  id:number | undefined;
  comment:string | undefined;    
  idpost:string | undefined;
  autor:string | undefined;
}

export const CommentSchema = new Schema<Comment>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true }, 
    comment: { type: String, required: true },
    idpost: { type: String, required: true },
    autor: { type: String, required: true },
  },
  { timestamps: true },
); 