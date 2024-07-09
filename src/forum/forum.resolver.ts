import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ForumService } from './forum.service';
import { Forum } from './entities/forum.entity';
import { Comment } from './entities/comment.entity';
import { CreateForumInput } from './dto/create-forum.input';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { UpdateForumInput } from './dto/update-forum.input';

//------------------------------------Forum Methods------------------------------------
@Resolver(() => Forum)
export class ForumResolver {
  constructor(private readonly forumService: ForumService) {}

  @Query(() => Forum)
  getForum(@Args('id', { type: () => Int }) id: number) {
    try {
      return this.forumService.getForum(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Query(() => [Forum])
  async getForumsByDocument(@Args('id', {type: () => String}) id:string) {
    try {
      return await this.forumService.getForumsByDocument(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Forum)
  createForum(@Args('input') createForumInput: CreateForumInput) {
    try {
      return this.forumService.createForum(createForumInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Forum)
  updateForum(@Args('input') updateForumInput: UpdateForumInput){
    try {
      return this.forumService.updateForum(updateForumInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }


}

//------------------------------------Comment Methods------------------------------------
@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly forumService: ForumService) {}


  @Mutation(() => Comment)
  updateComment(@Args('input') updateCommentInput: UpdateCommentInput){
    try {
      return this.forumService.updateComment(updateCommentInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Query(() => [Comment])
  async getCommentsByForum(@Args('id', {type: () => Int}) id:number) {
    try {
      return await this.forumService.getCommentsByForum(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Comment)
  createComment(@Args('input') createCommentInput: CreateCommentInput) {
    try {
      return this.forumService.createComment(createCommentInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
