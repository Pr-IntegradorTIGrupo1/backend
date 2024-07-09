import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumService } from './forum.service';
import { CommentResolver, ForumResolver } from './forum.resolver';
import { Forum } from './entities/forum.entity';
import { Comment } from './entities/comment.entity';
import { Document } from 'src/document/entities/document.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Forum, Document,User])],
  providers: [ForumResolver, ForumService,CommentResolver],
})
export class ForumModule {}
