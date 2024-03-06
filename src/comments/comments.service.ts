import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { Model } from 'mongoose';
  import { InjectModel } from '@nestjs/mongoose';
  import { Comment } from './comment.model';
  
  @Injectable()
  export class CommentService {
    constructor(@InjectModel('Comment') private readonly commentModel: Model<Comment>) {}
  
    async getAllComments(): Promise<Comment[]> {
      return await this.commentModel.find().exec();
    }
  
    async getComment(id: string): Promise<Comment | null> {
      try {
        const comentario = await this.commentModel.findById(id).exec();
        if (!comentario) {
          throw new NotFoundException('Publicación no encontrada');
        }
        return comentario;
      } catch (error: any) {
        throw new InternalServerErrorException(error.message);
      }
    }
  
    async createComment(comentarioData: any): Promise<Comment> {
      try {
        const createdComentario = new this.commentModel(comentarioData); // No es necesario asignar _id manualmente
        return await createdComentario.save();
      } catch (error: any) {
        throw new InternalServerErrorException(error.message);
      }
    }
  
    async updateComment(id: string, comentarioData: any): Promise<Comment | null> {
      try {
        const existingComentario = await this.commentModel.findById(id).exec();
        if (!existingComentario) {
          throw new NotFoundException('Publicación no encontrada');
        }
  
        // Actualizar los campos de la publicación existente
        existingComentario.comment = comentarioData.comentario;
        existingComentario.autor = comentarioData.autor;
  
        // Guardar los cambios en la base de datos
        return await existingComentario.save();
      } catch (error: any) {
        throw new InternalServerErrorException(error.message);
      }
    }
  
    async deleteComment(id: string): Promise<void> {
      try {
        await this.commentModel.findByIdAndDelete(id).exec();
      } catch (error: any) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }