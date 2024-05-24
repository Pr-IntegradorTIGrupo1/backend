import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ForumService } from './forum.service';
import { Forum } from './entities/forum.entity';
import { CreateForumInput } from './dto/create-forum.input';
import { UpdateForumInput } from './dto/update-forum.input';

@Resolver(() => Forum)
export class ForumResolver {
  constructor(private readonly forumService: ForumService) {}

  @Mutation(() => Forum)
  createForum(@Args('createForumInput') createForumInput: CreateForumInput) {
    return this.forumService.create(createForumInput);
  }

  @Query(() => [Forum], { name: 'forum' })
  findAll() {
    return this.forumService.findAll();
  }

  @Query(() => Forum, { name: 'forum' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.forumService.findOne(id);
  }

  @Mutation(() => Forum)
  updateForum(@Args('updateForumInput') updateForumInput: UpdateForumInput) {
    return this.forumService.update(updateForumInput.id, updateForumInput);
  }

  @Mutation(() => Forum)
  removeForum(@Args('id', { type: () => Int }) id: number) {
    return this.forumService.remove(id);
  }
}
