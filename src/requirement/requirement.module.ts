import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequirementService } from './requirement.service';
import { RequirementResolver } from './requirement.resolver';
import { Requirement } from './entities/requirement.entity';
import { Document } from 'src/document/entities/document.entity';
import { Campo } from './entities/campo.entity';
import { CampoService } from './campo.service';
@Module({
  imports: [TypeOrmModule.forFeature([Requirement,Campo,Document])],
  providers: [RequirementResolver, RequirementService,CampoService],
})
export class RequirementModule {}
