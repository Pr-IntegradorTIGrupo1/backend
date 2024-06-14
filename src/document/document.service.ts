import { Inject, Injectable } from '@nestjs/common';
import { CreateDocumentInput } from './dto/create-document.input';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { Requirement } from 'src/requirement/entities/requirement.entity';
import { Version } from './entities/version.entity';
import { Template } from './entities/template.entity';
import { UpdateDocumentInput } from './dto/update-document.input';
import { CreateTemplateInput } from './dto/create-template.input';
import { RequirementService } from 'src/requirement/requirement.service';

@Injectable()
export class DocumentService {
  constructor(
    private readonly requirementService: RequirementService,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(Template)
    private templateRepository: Repository<Template>,
    @InjectRepository(Version)
    private versionRepository: Repository<Version>,
    @InjectRepository(Requirement)
    private requirementRepository: Repository<Requirement>,
  ) {}

  //------------------------------------Document Methods------------------------------------
  async getDocument(id: number): Promise<Document> {
    return await this.documentRepository.findOne({ where: { id } });
  }

  async getDocumentsByUser(id_user: number): Promise<Document[]> {
    return await this.documentRepository.find({ where: { id_user } });
  }

  async getAllDocument(): Promise<Document[]> {
    return await this.documentRepository.find();
  }

  async createRequirements(content:string,document:Document){
    const json = JSON.parse(content);

    const requirements: Requirement [] = [];
    for(const requirementData of json.format){
      const requirement = await this.requirementService.createRequirement(requirementData.title,requirementData.type,document,requirementData.campos);
      requirement.campos = requirementData.campos;
      const saveRequirement = await this.requirementRepository.save(requirement);
      document.requirements.push(saveRequirement); // se guarda en la db antes de guardarlos en documentos
    }
    await this.documentRepository.save(document);
  }

  async createNewVersion(document:Document,idUser:number){
    const document_id = document.id;
    //buscamos si tiene alguna alguna relacion con version, sino creamos una version
    //creo que aqui seria buscar old version
    const version = await this.versionRepository.findOne({where:{ document:{id:document_id}}});
    const fechaActual = new Date();
    const fechaString = fechaActual.toISOString().slice(0,16);
    if(!version){
      //primera version (recien se crea el documento)
      const newVersion = new Version();
      newVersion.document = document;
      newVersion.timestamp = fechaString;
      newVersion.version = 1;
      newVersion.id_user = idUser;
      await this.versionRepository.save(newVersion);
    }
    else {
      
      const newVersion = new Version();
      const versionAntigua = version.version;
      newVersion.version = versionAntigua + 1;
      newVersion.timestamp = fechaString;
      newVersion.id_user = idUser;
      newVersion.document = document;
      newVersion.document_old
      version.document_old = document;
      await this.versionRepository.save(version);
    }
  }

 

  async createDocument(input: CreateDocumentInput): Promise<Document> {
    const {id_template,id_user,title,content} = input;
    //verificamos que existe el template
    try {
      const template  = await this.templateRepository.findOne({where:{ id: id_template}});
      if(!template){
        throw new Error('Plantilla no encontrada');
      }
    
      const document = new Document();
      document.id_user = id_user;
      document.title = title;
      document.template = template;
      const fechaActual = new Date();
      const fechaString = fechaActual.toISOString().slice(0,16);
      document.timestamp = fechaString;
      const saveDocument = await this.documentRepository.save(document);
      this.createRequirements(content,saveDocument);
      this.createNewVersion(document,id_user);

      template.documents.push(document);
      
      //creamos la primera version
      

    } catch (error) {
      throw new Error(`Error al crear el documento: ${error.message}`);
    }
    return await this.documentRepository.save(document);
  }

  // async copyDocument(document:Document):Promise<Document>{
  //   const newDocument = new Document();
  //   newDocument.forums = document.forums;
  //   newDocument.id_user = document.id_user;
  //   newDocument.requirements = document.requirements;
  //   newDocument.template = document.template;
  //   newDocument.title = document.title;
  //   await this.documentRepository.save(newDocument);
  //   return newDocument;
  // }
  // async updateDocument(input: UpdateDocumentInput): Promise<Document> {
  //   const document = await this.documentRepository.findOne({
  //     where: { id: input.id },
  //   });
  //   if (!document) {
  //     throw new Error('Documento no encontrado');
  //   }
  //   const newDocument = this.copyDocument(document);
  //   if (input.title) {
  //     newDocument.title = input.title;
  //   }
  //   if (input.id_template) {
  //     const template = await this.templateRepository.findOne({
  //       where: { id: input.id_template },
  //     });
  //     if (!template) {
  //       throw new Error('Plantilla no encontrada');
  //     }
  //     newDocument.template = template;
  //   }
  //   await this.createNewVersion(document, input.id_user)
  //   return await this.documentRepository.save(document);
  // }

  //------------------------------------Template Methods------------------------------------
  async getTemplate(id: number): Promise<Template> {
    return await this.templateRepository.findOne({ where: { id } });
  }

  async getAllTemplate(): Promise<Template[]> {
    return await this.templateRepository.find();
  }

  async createTemplate(input: CreateTemplateInput): Promise<Template> {
    const template = this.templateRepository.create(input);
    return await this.templateRepository.save(template);
  }
}
