import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequirementInput } from './dto/create-requirement.input';
import { UpdateRequirementInput } from './dto/update-requirement.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Requirement } from './entities/requirement.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Document } from 'src/document/entities/document.entity';
import { FindRequirementsById } from './dto/find-requirementById.dto';
import { AddCampoDto } from './dto/add-campo.dto';
import { CampoService } from './campo.service';

@Injectable()
export class RequirementService {

  constructor(
    @InjectRepository(Requirement)
    private readonly requirementRepository: Repository<Requirement>,
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    private readonly campoService:CampoService,
  ){}



  //async asociateDocument()
 
  async createRequirement({title,id_document}: CreateRequirementInput) {
    const documento = await this.documentRepository.findOne({where: {id:id_document},
    relations:['requirements' ]});
    if(!documento){
      throw new NotFoundException(`Document with ID ${id_document} not found`);
    }
 //se inicia el false ya que recien se crea el requirimiento
    const status = false;
    const requirement = new Requirement();
    requirement.title = title;
    requirement.status = status;
    //logica de asociar al documento, para agregar mas documento al requisitos no es aca
    //hacemos la relacion bidireccional
    requirement.documents = [documento];
    documento.requirements.push(requirement);
    //guardar cambios.
    await this.documentRepository.save(documento); 
    return await this.requirementRepository.save(requirement);
    
  }

  async getAllRequirementById({id}:FindRequirementsById): Promise<Requirement[]> {
    const document = await this.documentRepository.findOne({where: {id},
    relations:['requirements' ]});
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

  async createCampo(input:AddCampoDto):Promise<Requirement>{
    const {title,cuerpo,id_requisito}=input;
    const requirement = await this.requirementRepository.findOne({where:{id:id_requisito},
    relations:['campos']})
    if(!requirement){
      throw new NotFoundException(`Requirement with ID ${id_requisito} not found`);
    }
    //creamos el campo con todas sus relaciones (se guarda en la base de datos)
    const campo = await this.campoService.createCampo(title,cuerpo,requirement);
    //relacionar requirement con campo
    requirement.campos.push(campo);
    //guardamos los cambios
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
