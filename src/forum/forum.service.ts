import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateForumInput } from './dto/create-forum.input';
import { Forum } from './entities/forum.entity';
import { Comment } from './entities/comment.entity';
import { Document } from 'src/document/entities/document.entity';
import {
  Connection,
  DataSource,
  EntityManager,
  Not,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentInput } from './dto/create-comment.input';
import { relative } from 'path';
import { UpdateCommentInput } from './dto/update-comment.input';
import { UpdateForumInput } from './dto/update-forum.input';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private forumRepository: Repository<Forum>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(User)
<<<<<<< HEAD
    private readonly userRepository: Repository<User>,
    private dataSource: DataSource,
=======
    private userRepository: Repository<User>,
>>>>>>> 1b447979b4ea5941412c86efa6a9b07ea5dc2b4a
  ) {}

  //------------------------------------Forum Methods------------------------------------
  async getForum(id: number): Promise<Forum> {
    const forum = await this.forumRepository.findOne({
      where: { id },
<<<<<<< HEAD
      relations: ['comments', 'document', 'user'],
=======
      relations: ['comments'],
>>>>>>> 1b447979b4ea5941412c86efa6a9b07ea5dc2b4a
    });
    if (!forum) {
      throw new NotFoundException('Foro no encontrado');
    }
    return forum;
  }

  //retorna los foros de un documento
  async getForumsByDocument(id_document: string): Promise<Forum[]> {
    const document = await this.documentRepository.findOne({
      where: { id_document: id_document },
      relations: ['forums', 'forums.comments'],
    });
    if (!document) {
      throw new NotFoundException('documento no encontrado');
    }
    const forums_documents = document.forums;

    if (!forums_documents) {
      throw new NotFoundException('Foro no encontrado');
    }
    return forums_documents;
  }

  async createForum(input: CreateForumInput): Promise<Forum> {
<<<<<<< HEAD
    return await this.dataSource.transaction(async (manager) => {
      const document = await manager.findOne(Document, {
        where: { id: input.id_document },
        relations: ['forums'],
      });
      if (!document) {
        throw new NotFoundException('Documento no encontrado');
      }

      const user = await manager.findOne(User, {
        where: { id: input.id_user },
        relations: ['forums'],
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const forum = new Forum();
      forum.content = input.content;
      forum.title = input.title;
      forum.document = document;
      forum.status = input.status;
      forum.user = user;

      const savedForum = await manager.save(forum);

      user.forums.push(savedForum);
      await manager.save(user);

      document.forums.push(savedForum);
      await manager.save(document);

      return savedForum;
    });
=======
    const document = await this.documentRepository.findOne({
      where: { id: input.id_document },
      relations: ['forums'],
    });
    if (!document) {
      throw new NotFoundException('Documento no encontrado');
    }
    const user = await this.userRepository.findOne({
      where: { id: input.id_user },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const forum = new Forum();
    forum.content = input.content;
    forum.title = input.title;
    forum.document = document;
    forum.status = input.status;
    forum.user = user;
    const savedForum = await this.forumRepository.save(forum);
    document.forums.push(savedForum);
    await this.documentRepository.save(document);
    return savedForum;
>>>>>>> 1b447979b4ea5941412c86efa6a9b07ea5dc2b4a
  }

  async updateForum(input: UpdateForumInput): Promise<Forum> {
    const forum = await this.forumRepository.findOne({
      where: { id: input.id },
    });
    if (!forum) {
      throw new NotFoundException('Foro no encontrado');
    }
    forum.title = input.title;
    forum.content = input.content;
    forum.status = input.status;
    return await this.forumRepository.save(forum);
<<<<<<< HEAD
  }

  //------------------------------------Comment Methods------------------------------------

=======
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
>>>>>>> 1b447979b4ea5941412c86efa6a9b07ea5dc2b4a
  async updateComment(input: UpdateCommentInput): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id: input.id },
    });
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
<<<<<<< HEAD
    return this.dataSource.transaction(async (manager: EntityManager) => {
      const forum = await manager.findOne(Forum, {
        where: { id: input.id_forum },
        relations: ['comments'],
      });
      if (!forum) {
        throw new NotFoundException('Foro no encontrado');
      }
      const user = await manager.findOne(User, {
        where: { id: input.id_user },
        relations:['comments']
      });
      if (!user) {
        throw new NotFoundException('usuario no encontrado');
      }
      const comment = manager.create(Comment, {
        content: input.content,
        forum: forum,
        user: user
      });
      const savedComment = await manager.save(comment);
      // Actualizar la lista de comentarios en el foro y
      forum.comments.push(savedComment);
      user.comments.push(savedComment);
      await manager.save([user, forum]);
      return savedComment;
=======
    const forum = await this.forumRepository.findOne({
      where: { id: input.id_forum },
      relations: ['comments'],
>>>>>>> 1b447979b4ea5941412c86efa6a9b07ea5dc2b4a
    });
  }
}
