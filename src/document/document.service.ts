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
  //------------------------------------Other Methods------------------------------------
  // Generate a random id for the document
  generateRandomId(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Create a unique random id for the document
  async generateUniqueRandomId(): Promise<string> {
    let uniqueId = this.generateRandomId();
    let documentExists = await this.documentRepository.findOne({
      where: { id_document: uniqueId },
    });

    while (documentExists) {
      uniqueId = this.generateRandomId();
      documentExists = await this.documentRepository.findOne({
        where: { id_document: uniqueId },
      });
    }

    return uniqueId;
  }

  //------------------------------------Document Methods------------------------------------
  // Get document by id
  async getDocument(id: number): Promise<Document> {
    return await this.documentRepository.findOne({
      where: { id },
      relations: ['requirements', 'version', 'template', 'forums'],
    });
  }

  // Get documents by user id
  async getDocumentsByUser(id_user: number): Promise<Document[]> {
    return await this.documentRepository.find({
      where: { id_user },
      relations: ['requirements', 'version', 'template', 'forums'],
    });
  }

  // Get documents by project id
  async getDocumentsByProject(id_project: number): Promise<Document[]> {
    return await this.documentRepository.find({
      where: { id_project },
      relations: ['requirements', 'version', 'template', 'forums'],
    });
  }

  // Get all documents
  async getAllDocument(): Promise<Document[]> {
    return await this.documentRepository.find({
      relations: ['requirements', 'version', 'template', 'forums'],
    });
  }

  // Get all versions of a document by document id
  async getAllDocumentsVersions(id_document: number): Promise<Document[]> {
    // Find document
    const document = await this.documentRepository.findOne({
      where: { id: id_document },
      relations: ['version'],
    });

    if (!document) {
      throw new Error('Documento no encontrado');
    }
    // Find all versions of the document
    let documents = await this.documentRepository.find({
      where: { id_document: document.id_document },
      relations: ['requirements', 'version', 'template', 'forums'],
      order: { version: { version: 'DESC' } },
    });

    return documents;
  }

  // Create requirements for a document
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
    }
    await this.documentRepository.save(document);
  }

  // Create a new version of a document
  async createVersion(document: Document, idUser: number) {
    const version = await this.versionRepository.create({
      id_user: idUser,
      timestamp: new Date().toISOString().slice(0, 16),
      version: 1,
      document: document,
    });
    await this.versionRepository.save(version);
    await this.documentRepository.save(document);
  }

  // Update a document version
  async updateVersion(
    idUser: number,
    versionNumber: number,
    document: Document,
  ) {
    const version = await this.versionRepository.create({
      id_user: idUser,
      timestamp: new Date().toISOString().slice(0, 16),
      version: versionNumber + 1,
      document: document,
    });
    await this.versionRepository.save(version);
    await this.documentRepository.save(document);
  }

  // Create a new document
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
    document.id_document = await this.generateUniqueRandomId();
    document.id_user = id_user;
    document.title = title;
    document.template = template;
    document.id_project = input.id_project;
    const fechaActual = new Date();
    const fechaString = fechaActual.toISOString().slice(0, 16);
    document.timestamp = fechaString;
    document.read_only = false;
    document.is_active = true;
    const saveDocument = await this.documentRepository.save(document);
    this.createRequirements(content, saveDocument);
    this.createVersion(document, id_user);

    const success = true;
    const message = 'Documento creado exitosamente';
    const response = { success, message };

    return response;
  }

  // Update a document
  async updateDocument(input: UpdateDocumentInput): Promise<DocumentResponse> {
    // Find old document
    const document_old = await this.documentRepository.findOne({
      where: { id: input.id_document },
      relations: ['version'],
    });
    if (!document_old) {
      throw new Error('Documento no encontrado');
    }

    // Check if document is read only
    if (document_old.read_only) {
      throw new Error('Documento no se puede actualizar');
    }
    document_old.read_only = true;
    await this.documentRepository.save(document_old);

    // Find template
    const template = await this.templateRepository.findOne({
      where: { id: input.id_template },
    });
    if (!template) {
      throw new Error('Plantilla no encontrada');
    }

    // Create new document
    const document_new = this.documentRepository.create({
      id_user: input.id_user,
      id_document: document_old.id_document,
      title: input.title,
      template: template,
      id_project: document_old.id_project,
      read_only: false,
      is_active: true,
      timestamp: new Date().toISOString().slice(0, 16),
    });

    const saveDocument = await this.documentRepository.save(document_new);

    await this.createRequirements(input.content, saveDocument);
    await this.updateVersion(
      input.id_user,
      document_old.version.version,
      document_new,
    );

    const success = true;
    const message = 'Documento actualizado exitosamente';
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
