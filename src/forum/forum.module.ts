import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumService } from './forum.service';
import { ForumResolver } from './forum.resolver';
import { Forum } from './entities/forum.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Forum])],
  providers: [ForumResolver, ForumService],
})
export class ForumModule {}
