import { Injectable, NotFoundException, RequestMethod } from '@nestjs/common';
import { CreateRequirementInput } from './dto/create-requirement.input';
import { UpdateRequirementInput } from './dto/update-requirement.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Requirement } from './entities/requirement.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Document } from 'src/document/entities/document.entity';
import { FindRequirementsById } from './dto/find-requirementById.dto';
import { AddCampoDto } from './dto/add-campo.dto';

@Injectable()
export class RequirementService {

  constructor(
    @InjectRepository(Requirement)
    private readonly requirementRepository: Repository<Requirement>,
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ){}



  //async asociateDocument()
 
  async createRequirement(title:string,type:string,document:Document,campos:string[]):Promise<Requirement> {
 //se inicia el false ya que recien se crea el requirimiento
    const status = false;
    const requirement = new Requirement();
    requirement.title = title;
    requirement.status = status;
    requirement.type = type;
    requirement.document = document;
    requirement.campos = campos;
    //logica de asociar al documento, para agregar mas documento al requisitos no es aca
    //hacemos la relacion bidireccional
    requirement.document = document;
    document.requirements.push(requirement);
    return requirement;
    
  }
  addRequirement(createRequirementInput: CreateRequirementInput): Requirement | PromiseLike<Requirement> {
    throw new Error('Method not implemented.');
  }

  async getAllRequirementById({id}:FindRequirementsById): Promise<Requirement[]> {
    const document = await this.documentRepository.findOne({where: {id},
    relations:['requirements','requirements.campos' ]});
    if (!document) {
      throw new Error(`Document with id ${id} not found`);
    }
    return document.requirements;
  }



  async update(input: UpdateRequirementInput):Promise<Requirement> {
    const {id,status,title} = input
    const requirement = await this.requirementRepository.findOne({where: {id}});
    if(!requirement){
      throw new NotFoundException(`Requirement with ID ${id} not found`);
    }
    if(status !== undefined){
      requirement.status = status;
    }
    if(title !== undefined){
      requirement.title = title;
    }
    return await this.requirementRepository.save(requirement);
  }

  async remove(id: number): Promise<Requirement> {
    try {
      const req = await this.requirementRepository.findOneOrFail({ where: { id } });
      await this.requirementRepository.remove(req);
      return req;
    }  catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Requirement with id ${id} not found`);
      } else {
        throw error;
      }
    }
  }
}
