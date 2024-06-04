import { Test, TestingModule } from '@nestjs/testing';
import { CampoService } from '../campo.service';

describe('CampoService', () => {
  let service: CampoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampoService],
    }).compile();

    service = module.get<CampoService>(CampoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
