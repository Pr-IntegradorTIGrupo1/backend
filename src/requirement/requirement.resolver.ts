import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RequirementService } from './requirement.service';
import { Requirement } from './entities/requirement.entity';
import { CreateRequirementInput } from './dto/create-requirement.input';
import { UpdateRequirementInput } from './dto/update-requirement.input';
import { FindRequirementsById } from './dto/find-requirementById.dto';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Requirement)
export class RequirementResolver {
  constructor(private readonly requirementService: RequirementService) {}

  //------------------------------------Requirement Methods------------------------------------
  //crea un nuevo requirimiento
  @Mutation(() => Requirement)
  async addRequirement(
    @Args('createRequirementInput')
    createRequirementInput: CreateRequirementInput,
  ): Promise<Requirement> {
    try {
      return await this.requirementService.addRequirement(
        createRequirementInput,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  //obtener los requirimientos por id del documento
  @Query(() => [Requirement], { name: 'requirementsByDocument' })
  async getRequirementsByDocumentId(
    @Args('input') findRequirementById: FindRequirementsById,
  ): Promise<Requirement[]> {
    try {
      return await this.requirementService.getAllRequirementById(
        findRequirementById,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  //editar requirimiento
  @Mutation(() => Requirement)
  async updateRequirement(
    @Args('input') updateRequirementInput: UpdateRequirementInput,
  ): Promise<Requirement> {
    try {
      return await this.requirementService.update(updateRequirementInput);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  //remover requisitos
  @Mutation(() => Requirement)
  async removeRequirement(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Requirement> {
    try {
      return await this.requirementService.remove(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
