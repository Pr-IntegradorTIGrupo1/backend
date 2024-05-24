import { Module } from '@nestjs/common';
import { RequirementService } from './requirement.service';
import { RequirementResolver } from './requirement.resolver';

@Module({
  providers: [RequirementResolver, RequirementService],
})
export class RequirementModule {}
