import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CommentService } from './comments.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly comentariosService: CommentService) {}

  @Get()
  async getAllComentarios() {
    return await this.comentariosService.getAllComments();
  }

  @Get(':id')
  async getComentario(@Param('id') id: string) {
    return await this.comentariosService.getComment(id);
  }

  @Post()
  async createComentario(@Body() comentarioData: any) {
    return await this.comentariosService.createComment(comentarioData);
  }

  @Put(':id')
  async updateComentario(
    @Param('id') id: string,
    @Body() comentarioData: any,
  ): Promise<any> {
    return await this.comentariosService.updateComment(id, comentarioData);
  }

  @Delete(':id')
  async deleteComentario(@Param('id') id: string) {
    await this.comentariosService.deleteComment(id);
    return { message: 'Comentario deleted successfully' };
  }
}