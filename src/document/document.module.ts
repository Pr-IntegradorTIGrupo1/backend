import { Module, Req } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentService } from './document.service';
import { DocumentResolver } from './document.resolver';
import { Document } from './entities/document.entity';
import { Template } from './entities/template.entity';
import { Version } from './entities/version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Template, Version])],
  providers: [DocumentResolver, DocumentService],
})
export class DocumentModule {}
