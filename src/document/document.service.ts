import { Inject, Injectable } from '@nestjs/common';
import { CreateDocumentInput } from './dto/create-document.input';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Document, DocumentResponse } from './entities/document.entity';
import { Requirement } from 'src/requirement/entities/requirement.entity';
import { Version } from './entities/version.entity';
import { Template, TemplateResponse } from './entities/template.entity';
import { UpdateDocumentInput } from './dto/update-document.input';
import { CreateTemplateInput } from './dto/create-template.input';
import { RequirementService } from 'src/requirement/requirement.service';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/project/entities/project.entity';

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
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
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
      where: { id, is_active: true },
      relations: [
        'requirements',
        'version',
        'template',
        'forums',
        'user',
        'project',
      ],
    });
  }

  // Get documents by user id
  async getDocumentsByUser(id_user: number): Promise<Document[]> {
    const user = await this.userRepository.findOne({
      where: { id: id_user },
      relations: ['projects'],
    });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const projectIds = user.projects.map((project) => project.id);

    if (projectIds.length === 0) {
      throw new Error('Usuario no tiene proyectos asignados');
    }

    let documents = await this.documentRepository.find({
      where: {
        project: { id: In(projectIds) },
        version: { last_version: true },
        is_active: true,
      },
      relations: [
        'requirements',
        'version',
        'template',
        'forums',
        'user',
        'project',
      ],
    });

    return documents;
  }

  // Get last version documents by project id
  async getDocumentsByProject(id_project: number): Promise<Document[]> {
    let documents = await this.documentRepository.find({
      where: { project: { id: id_project }, is_active: true },
      relations: [
        'requirements',
        'version',
        'template',
        'forums',
        'user',
        'project',
      ],
    });

    documents = documents.filter(
      (document) => document.version.last_version === true,
    );

    return documents;
  }

  // Get last version documents by projects ids
  async getDocumentsByProjects(id_projects: number[]): Promise<Document[]> {
    let documents = await this.documentRepository.find({
      where: { project: In(id_projects), is_active: true },
      relations: [
        'requirements',
        'version',
        'template',
        'forums',
        'user',
        'project',
      ],
    });

    documents = documents.filter(
      (document) => document.version.last_version === true,
    );

    return documents;
  }

  // Get all documents
  async getAllDocument(): Promise<Document[]> {
    return await this.documentRepository.find({
      where: { is_active: true },
      relations: [
        'requirements',
        'version',
        'template',
        'forums',
        'user',
        'project',
      ],
    });
  }

  // Get all last version documents
  async getAllDocumentsLastVersion(): Promise<Document[]> {
    let documents = await this.documentRepository.find({
      where: { is_active: true },
      relations: [
        'requirements',
        'version',
        'template',
        'forums',
        'user',
        'project',
      ],
    });

    documents = documents.filter(
      (document) => document.version.last_version === true,
    );

    return documents;
  }

  // Get all versions of a document by document id
  async getAllDocumentsVersions(id_document: number): Promise<Document[]> {
    // Find document
    const document = await this.documentRepository.findOne({
      where: { id: id_document, is_active: true },
      relations: ['version'],
    });

    if (!document) {
      throw new Error('Documento no encontrado');
    }
    // Find all versions of the document
    let documents = await this.documentRepository.find({
      where: { id_document: document.id_document, is_active: true },
      relations: [
        'requirements',
        'version',
        'template',
        'forums',
        'user',
        'project',
      ],
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
    const user = await this.userRepository.findOne({ where: { id: idUser } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const version = await this.versionRepository.create({
      user,
      timestamp: new Date().toISOString().slice(0, 16),
      version: 1,
      document: document,
      last_version: true,
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
    const user = await this.userRepository.findOne({ where: { id: idUser } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const version = await this.versionRepository.create({
      user,
      timestamp: new Date().toISOString().slice(0, 16),
      version: versionNumber + 1,
      document: document,
      last_version: true,
    });
    await this.versionRepository.save(version);
    await this.documentRepository.save(document);
  }

  async deleteVersion(id: number) {
    const document = await this.documentRepository.findOne({
      where: { id },
      relations: ['version'],
    });
    if (!document) {
      throw new Error('Documento no encontrado');
    }

    const newLastVersion = await this.documentRepository.findOne({
      where: {
        id_document: document.id_document,
        is_active: true,
        version: { version: document.version.version - 1 },
      },
      relations: ['version'],
    });

    document.version.last_version = false;
    newLastVersion.version.last_version = true;
    newLastVersion.read_only = false;
    await this.versionRepository.save(document.version);
    await this.versionRepository.save(newLastVersion.version);
    await this.documentRepository.save(newLastVersion);

    const success = true;
    const message = 'Versión eliminada exitosamente';
    const response = { success, message };

    return response;
  }

  // Create a new document
  async createDocument(input: CreateDocumentInput): Promise<DocumentResponse> {
    //verificamos que existe el template
    const template = await this.templateRepository.findOne({
      where: { id: input.id_template },
    });
    if (!template) {
      throw new Error('Plantilla no encontrada');
    }
    const user = await this.userRepository.findOne({
      where: { id: input.id_user },
      relations: ['projects'],
    });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const project = await this.projectRepository.findOne({
      where: { id: input.id_project },
    });
    if (!project) {
      throw new Error('Proyecto no encontrado');
    }

    const foundProject = user.projects.some(
      (project) => project.id === input.id_project,
    );
    if (!foundProject) {
      throw new Error('Usuario no pertenece al proyecto');
    }

    const sameTitle = await this.documentRepository.findOne({
      where: { title: input.title, project: { id: input.id_project } },
    });
    if (sameTitle) {
      throw new Error('Ya existe un documento con ese título en el proyecto');
    }

    const document = new Document();
    document.id_document = await this.generateUniqueRandomId();
    document.user = user;
    document.title = input.title;
    document.template = template;
    document.project = project;
    const fechaActual = new Date();
    const fechaString = fechaActual.toISOString().slice(0, 16);
    document.timestamp = fechaString;
    document.read_only = false;
    document.is_active = true;
    const saveDocument = await this.documentRepository.save(document);
    this.createRequirements(input.content, saveDocument);
    this.createVersion(document, input.id_user);

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
      relations: ['version', 'project'],
    });
    if (!document_old) {
      throw new Error('Documento no encontrado');
    }

    // Find template
    const template = await this.templateRepository.findOne({
      where: { id: input.id_template },
    });
    if (!template) {
      throw new Error('Plantilla no encontrada');
    }

    // Find user
    const user = await this.userRepository.findOne({
      where: { id: input.id_user },
    });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const sameTitle = await this.documentRepository.findOne({
      where: {
        id_document: Not(document_old.id_document),
        title: input.title,
        project: { id: document_old.project.id },
      },
    });
    if (sameTitle) {
      throw new Error('Ya existe un documento con ese título en el proyecto');
    }

    // Check if document is read only
    if (document_old.read_only) {
      throw new Error('Documento no se puede actualizar');
    }
    document_old.read_only = true;
    await this.documentRepository.save(document_old);

    // Create new document
    const document_new = this.documentRepository.create({
      user: user,
      id_document: document_old.id_document,
      title: input.title,
      template: template,
      project: document_old.project,
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

    document_old.version.last_version = false;
    await this.versionRepository.save(document_old.version);

    const success = true;
    const message = 'Documento actualizado exitosamente';
    const response = { success, message };

    return response;
  }

  async deleteDocument(id: number): Promise<DocumentResponse> {
    const document = await this.documentRepository.findOne({
      where: { id, is_active: true },
      relations: ['version'],
    });
    if (!document) {
      throw new Error('Documento no encontrado');
    }

    if (document.read_only) {
      throw new Error('Solo se puede eliminar la ultima versión del documento');
    }

    await this.deleteVersion(document.id);

    document.is_active = false;
    document.read_only = true;
    await this.documentRepository.save(document);

    const success = true;
    const message = 'Documento eliminado exitosamente';
    const response = { success, message };

    return response;
  }

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
