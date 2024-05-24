import { Module } from '@nestjs/common';
import { DocumentModule } from './document/document.module';
import { ForumModule } from './forum/forum.module';
import { RequirementModule } from './requirement/requirement.module';

@Module({
  imports: [DocumentModule, ForumModule, RequirementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
