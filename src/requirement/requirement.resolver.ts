import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RequirementService } from './requirement.service';
import { Requirement } from './entities/requirement.entity';
import { CreateRequirementInput } from './dto/create-requirement.input';
import { UpdateRequirementInput } from './dto/update-requirement.input';



@Resolver(() => Requirement)
export class RequirementResolver {
  constructor(private readonly requirementService: RequirementService) {}

  @Mutation(() => Requirement)
  createRequirement(@Args('createRequirementInput') createRequirementInput: CreateRequirementInput) {
    return this.requirementService.create(createRequirementInput);
  }

  @Query(() => [Requirement], { name: 'requirement' })
  findAll() {
    return this.requirementService.findAll();
  }

  @Query(() => Requirement, { name: 'requirement' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.requirementService.findOne(id);
  }

  @Mutation(() => Requirement)
  updateRequirement(@Args('updateRequirementInput') updateRequirementInput: UpdateRequirementInput) {
    return this.requirementService.update(updateRequirementInput.id, updateRequirementInput);
  }

  @Mutation(() => Requirement)
  removeRequirement(@Args('id', { type: () => Int }) id: number) {
    return this.requirementService.remove(id);
  }
}
