import { Injectable } from '@nestjs/common';
import { CreateForumInput } from './dto/create-forum.input';
import { UpdateForumInput } from './dto/update-forum.input';

@Injectable()
export class ForumService {
  create(createForumInput: CreateForumInput) {
    return 'This action adds a new forum';
  }

  findAll() {
    return `This action returns all forum`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forum`;
  }

  update(id: number, updateForumInput: UpdateForumInput) {
    return `This action updates a #${id} forum`;
  }

  remove(id: number) {
    return `This action removes a #${id} forum`;
  }
}
