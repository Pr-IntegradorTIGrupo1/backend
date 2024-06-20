import { Inject, Injectable } from '@nestjs/common';
import { CreateDocumentInput } from './dto/create-document.input';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Document, DocumentResponse } from './entities/document.entity';
import { Requirement } from 'src/requirement/entities/requirement.entity';
import { Version } from './entities/version.entity';
import { Template, TemplateResponse } from './entities/template.entity';
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
    return await this.documentRepository.findOne({
      where: { id },
      relations: ['requirements', 'version', 'template', 'forums'],
    });
  }

  async getDocumentsByUser(id_user: number): Promise<Document[]> {
    return await this.documentRepository.find({
      where: { id_user },
      relations: ['requirements', 'version', 'template', 'forums'],
    });
  }

  async getAllDocument(): Promise<Document[]> {
    return await this.documentRepository.find({
      relations: ['requirements', 'version', 'template', 'forums'],
    });
  }

  async createRequirements(content: string, document: Document) {
    const json = JSON.parse(content);

    for (const requirementData of json.requirements) {
      const reqString = JSON.stringify(requirementData);
      const requirement = await this.requirementService.createRequirement(
        document,
        reqString,
      );
      const saveRequirement =
        await this.requirementRepository.save(requirement);
      console.log(saveRequirement);
      // document.requirements.push(saveRequirement); // se guarda en la db antes de guardarlos en documentos
    }
    await this.documentRepository.save(document);
  }

  // async createNewVersion(document: Document, idUser: number) {
  //   const document_id = document.id;
  //   //buscamos si tiene alguna alguna relacion con version, sino creamos una version
  //   //creo que aqui seria buscar old version
  //   const version = await this.versionRepository.findOne({
  //     where: { document_old: { id: document_id } },
  //   });
  //   const fechaActual = new Date();
  //   const fechaString = fechaActual.toISOString().slice(0, 16);
  //   if (!version) {
  //     //primera version (recien se crea el documento)
  //     const newVersion = new Version();
  //     newVersion.document = document;
  //     newVersion.timestamp = fechaString;
  //     newVersion.version = 1;
  //     newVersion.id_user = idUser;
  //     await this.versionRepository.save(newVersion);
  //   } else {
  //     const newVersion = new Version();
  //     const versionAntigua = version.version;
  //     newVersion.version = versionAntigua + 1;
  //     newVersion.timestamp = fechaString;
  //     newVersion.id_user = idUser;
  //     newVersion.document = document;
  //     newVersion.document_old;
  //     version.document_old = document;
  //     await this.versionRepository.save(version);
  //   }
  // }

  async createVersion(document: Document, idUser: number) {
    const version = await this.versionRepository.create({
      id_user: idUser,
      timestamp: new Date().toISOString(),
      version: 1,
      document: document,
    });
    const saveVersion = await this.versionRepository.save(version);
    document.version = saveVersion;
    await this.documentRepository.save(document);
  }

  async createDocument(input: CreateDocumentInput): Promise<DocumentResponse> {
    const { id_template, id_user, title, content } = input;
    //verificamos que existe el template
    const template = await this.templateRepository.findOne({
      where: { id: id_template },
    });
    if (!template) {
      throw new Error('Plantilla no encontrada');
    }

    const document = new Document();
    document.id_user = id_user;
    document.title = title;
    document.template = template;
    document.id_project = input.id_project;
    const fechaActual = new Date();
    const fechaString = fechaActual.toISOString().slice(0, 16);
    document.timestamp = fechaString;
    const saveDocument = await this.documentRepository.save(document);
    this.createRequirements(content, saveDocument);
    this.createVersion(document, id_user);

    // template.documents.push(document);

    const success = true;
    const message = 'Documento creado exitosamente';
    const response = { success, message };

    return response;
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

  async createTemplate(input: CreateTemplateInput): Promise<TemplateResponse> {
    const template = this.templateRepository.create(input);
    await this.templateRepository.save(template);

    const success = true;
    const message = 'Plantilla creada exitosamente';
    const response = { success, message };

    return response;
  }
}
