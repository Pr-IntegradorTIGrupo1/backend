import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RequirementService } from './requirement.service';
import { Requirement } from './entities/requirement.entity';
import { CreateRequirementInput } from './dto/create-requirement.input';
import { UpdateRequirementInput } from './dto/update-requirement.input';
import { FindRequirementsById } from './dto/find-requirementById.dto';
import { AddCampoDto } from './dto/add-campo.dto';
import { Campo } from './entities/campo.entity';
import { CampoService } from './campo.service';
import { EditCampoDto } from './dto/edit-campo.dto';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Requirement)
export class RequirementResolver {
  constructor(
    private readonly requirementService: RequirementService,
    private readonly campoService: CampoService,
  ) {}

  //------------------------------------Requirement Methods------------------------------------
  //crea un nuevo requirimiento
  @Mutation(() => Requirement)
  async createRequirement(@Args('createRequirementInput') createRequirementInput: CreateRequirementInput): Promise<Requirement> {
    try {
      return await this.requirementService.createRequirement(createRequirementInput);
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
      return await this.requirementService.getAllRequirementById(findRequirementById);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  //editar requirimiento
  @Mutation(() => Requirement)
  async updateRequirement(@Args('input') updateRequirementInput: UpdateRequirementInput): Promise<Requirement> {
    try {
      return await this.requirementService.update(updateRequirementInput);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  //crear campo al requisito
  @Mutation(() => Requirement)
  async createCampoRequirement(@Args('input') addCampoDto: AddCampoDto): Promise<Requirement> {
    try {
      return await this.requirementService.createCampo(addCampoDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  //remover requisitos
  @Mutation(() => Requirement)
  async removeRequirement(@Args('id', { type: () => Int }) id: number): Promise<Requirement> {
    try {
      return await this.requirementService.remove(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}

//------------------------------------Campo Methods------------------------------------

@Resolver()
export class CampoResolver {
  constructor(private readonly campoService: CampoService) {}

  @Mutation(() => Campo)
  async editCampo(@Args('input') editCampoDto: EditCampoDto): Promise<Campo> {
    try {
      return await this.campoService.editCampo(editCampoDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Mutation(() => Campo)
  async removeCampo(@Args('id', { type: () => Int }) id: number): Promise<Campo> {
    try {
      return await this.campoService.remove(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}