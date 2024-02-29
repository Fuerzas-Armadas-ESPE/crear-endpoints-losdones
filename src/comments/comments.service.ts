import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from './comment.model';

@Injectable()
export class CommentsService {
    private comments: Comment[] = [];

    constructor() {
        this.createComment({
          id: uuidv4(),
          content: 'Sabes que... a mi tambien me pasa lo mismo.',
          postId: '1c12b365-48f4-4209-b6d9-52099c26222a'
        });
      }

    getAllComments(): Comment[] {
        return this.comments;
    }

    getCommentsByPostId(postId: string): Comment[] {
        return this.comments.filter(comment => comment.postId === postId);
    }

    getCommentById(id: string): Comment {
        const comment = this.comments.find(comment => comment.id === id);
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        return comment;
    }

    createComment(commentData: Comment): Comment {
        if (!commentData.content || !commentData.postId) {
            throw new BadRequestException('Content and postId are required');
        }

        const newComment: Comment = {
            id: uuidv4(),
            content: commentData.content,
            postId: commentData.postId,
        };

        this.comments.push(newComment);
        return newComment;
    }

    updateComment(id: string, commentData: Comment): Comment {
        const commentIndex = this.comments.findIndex(comment => comment.id === id);
        if (commentIndex === -1) {
            throw new NotFoundException('Comment not found');
        }

        this.comments[commentIndex] = { ...this.comments[commentIndex], ...commentData };

        return this.comments[commentIndex];
    }

    deleteComment(id: string): void {
        this.comments = this.comments.filter(comment => comment.id !== id);
    }
}
