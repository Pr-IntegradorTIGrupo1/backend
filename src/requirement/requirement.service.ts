import { Injectable } from '@nestjs/common';
import { CreateRequirementInput } from './dto/create-requirement.input';
import { UpdateRequirementInput } from './dto/update-requirement.input';

@Injectable()
export class RequirementService {
  create(createRequirementInput: CreateRequirementInput) {
    return 'This action adds a new requirement';
  }

  findAll() {
    return `This action returns all requirement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requirement`;
  }

  update(id: number, updateRequirementInput: UpdateRequirementInput) {
    return `This action updates a #${id} requirement`;
  }

  remove(id: number) {
    return `This action removes a #${id} requirement`;
  }
}
