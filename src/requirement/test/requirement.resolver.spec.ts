import { Test, TestingModule } from '@nestjs/testing';
import { RequirementResolver } from '../requirement.resolver';
import { RequirementService } from '../requirement.service';

describe('RequirementResolver', () => {
  let resolver: RequirementResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequirementResolver, RequirementService],
    }).compile();

    resolver = module.get<RequirementResolver>(RequirementResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
