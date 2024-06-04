import { Test, TestingModule } from '@nestjs/testing';

describe('CampoResolver', () => {
  let resolver: CampoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampoResolver],
    }).compile();

    resolver = module.get<CampoResolver>(CampoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
