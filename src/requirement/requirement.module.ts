import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequirementService } from './requirement.service';
import { RequirementResolver } from './requirement.resolver';
import { Requirement } from './entities/requirement.entity';
import { Document } from 'src/document/entities/document.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Requirement])],
  providers: [RequirementResolver, RequirementService],
})
export class RequirementModule {}
