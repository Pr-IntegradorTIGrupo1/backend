import { Inject, Injectable } from '@nestjs/common';
import { CreateForumInput } from './dto/create-forum.input';
import { Forum } from './entities/forum.entity';
import { Comment } from './entities/comment.entity';
import { Document } from 'src/document/entities/document.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentInput } from './dto/create-comment.input';

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
    return await this.forumRepository.findOne({ where: { id } });
  }

  async getAllForum(): Promise<Forum[]> {
    return await this.forumRepository.find();
  }

  async createForum(input: CreateForumInput): Promise<Forum> {
    const document = await this.documentRepository.findOne({
      where: { id: input.id_document },
    });
    if (!document) {
      throw new Error('Documento no encontrado');
    }
    const forum = this.forumRepository.create({ ...input, document });
    return await this.forumRepository.save(forum);
  }

  //------------------------------------Comment Methods------------------------------------
  async getComment(id: number): Promise<Comment> {
    return await this.commentRepository.findOne({ where: { id } });
  }

  async getAllComment(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async createComment(input: CreateCommentInput): Promise<Comment> {
    const forum = await this.forumRepository.findOne({
      where: { id: input.id_forum },
    });
    const comment = this.commentRepository.create({ ...input, forum });
    return await this.commentRepository.save(comment);
  }
}
