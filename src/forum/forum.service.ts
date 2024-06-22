import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateForumInput } from './dto/create-forum.input';
import { Forum } from './entities/forum.entity';
import { Comment } from './entities/comment.entity';
import { Document } from 'src/document/entities/document.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentInput } from './dto/create-comment.input';
import { relative } from 'path';
import { UpdateCommentInput } from './dto/update-comment.input';
import { UpdateForumInput } from './dto/update-forum.input';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private forumRepository: Repository<Forum>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  //------------------------------------Forum Methods------------------------------------
  async getForum(id: number): Promise<Forum> {
    const forum =  await this.forumRepository.findOne({ where: { id } });
    if(!forum){
      throw new NotFoundException('Foro no encontrado');
    }
    return forum;
  }

  async getForumsByDocument(id_document: number): Promise<Forum[]> {
    const forums =  this.forumRepository.find({ where: { id: id_document },relations:['forums']});
    if(!forums){
      throw new NotFoundException('Foro no encontrado');
    }
    return forums;
  }


  async createForum(input: CreateForumInput): Promise<Forum> {
    const document = await this.documentRepository.findOne({
      where: { id: input.id_document },
    });
    if (!document) {
      throw new NotFoundException('Documento no encontrado');
    }
    const forum = new Forum();
    forum.content = input.content;
    forum.title = input.title;
    forum.document = document;
    const savedForum = await this.forumRepository.save(forum);
    document.forums.push(savedForum);
    await this.documentRepository.save(document);
    return savedForum;
  }

  async updateForum(input:UpdateForumInput):Promise<Forum>{
    const forum = await this.forumRepository.findOne({ where: { id:input.id } });
    if (!forum) {
      throw new NotFoundException('Foro no encontrado');
    }
    forum.title = input.title;
    forum.content = input.content;
    forum.status  = input.status;
    return await this.forumRepository.save(forum); 
  }
  async deleteForum(id: number): Promise<boolean> {
    const forum = await this.forumRepository.findOne({ where: { id } });
    if (!forum) {
      throw new NotFoundException('Foro no encontrado');
    }
    await this.forumRepository.delete(id);
    return true;
  }

  //------------------------------------Comment Methods------------------------------------
  async getComment(id: number): Promise<Comment> {
    return await this.commentRepository.findOne({ where: { id } });
  }
  async updateComment(input:UpdateCommentInput): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id:input.id } });
    if (!comment) {
      throw new Error('Comentario no encontrado');
    }
    comment.content = input.content;
    return await this.commentRepository.save(comment); 

  }

  async getCommentsByForum(id_forum: number): Promise<Comment[]> {
    const forum = await this.forumRepository.findOne({
      where: { id: id_forum },
      relations: ['comments'],
    });
    if (!forum) {
      throw new NotFoundException('Foro no encontrado');
    }
    const comments = forum.comments;
    return comments;
  }

  async createComment(input: CreateCommentInput): Promise<Comment> {
    const forum = await this.forumRepository.findOne({
      where: { id: input.id_forum },
    });
    if (!forum) {
      throw new NotFoundException('Foro no encontrado');
    }
    const comment = new Comment();
    comment.content = input.content;
    comment.forum = forum;
    comment.id_user = input.id_user;
    const savedComment = await this.commentRepository.save(comment);
    // Actualizar la lista de comentarios en el foro
    forum.comments.push(savedComment);
    await this.forumRepository.save(forum);
    return savedComment;
  }
  async deleteComment(id: number): Promise<boolean> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comentario no encontrado');
    }
    await this.commentRepository.delete(id);
    return true;
  }
}
