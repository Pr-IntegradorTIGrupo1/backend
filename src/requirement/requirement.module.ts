import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequirementService } from './requirement.service';
import { RequirementResolver } from './requirement.resolver';
import { Requirement } from './entities/requirement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Requirement])],
  providers: [RequirementResolver, RequirementService],
})
export class RequirementModule {}
