import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentService } from './document.service';
import { DocumentResolver, TemplateResolver } from './document.resolver';
import { Document } from './entities/document.entity';
import { Template } from './entities/template.entity';
import { Version } from './entities/version.entity';
import { Requirement } from 'src/requirement/entities/requirement.entity';
import { RequirementService } from 'src/requirement/requirement.service';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Document,
      Template,
      Version,
      Requirement,
      User,
      Project,
    ]),
  ],
  providers: [
    DocumentResolver,
    TemplateResolver,
    DocumentService,
    RequirementService,
  ],
})
export class DocumentModule {}
