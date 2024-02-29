import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.model';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getAllComments(): Comment[] {
    return this.commentsService.getAllComments();
  }

  @Get('post/:postId')
  getCommentsByPostId(@Param('postId') postId: string): Comment[] {
    return this.commentsService.getCommentsByPostId(postId);
  }

  @Post()
  createComment(@Body() commentData: Comment): Comment {
    return this.commentsService.createComment(commentData);
  }
}
