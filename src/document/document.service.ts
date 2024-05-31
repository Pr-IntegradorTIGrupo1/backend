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

@Injectable()
export class DocumentService {
  constructor(
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

  async createDocument(input: CreateDocumentInput): Promise<Document> {
    const document = this.documentRepository.create(input);
    return await this.documentRepository.save(document);
  }

  async updateDocument(input: UpdateDocumentInput): Promise<Document> {
    const document = await this.documentRepository.findOne({
      where: { id: input.id },
    });
    if (!document) {
      throw new Error('Documento no encontrado');
    }
    if (input.title) {
      document.title = input.title;
    }
    if (input.id_template) {
      const template = await this.templateRepository.findOne({
        where: { id: input.id_template },
      });
      if (!template) {
        throw new Error('Plantilla no encontrada');
      }
      document.template = template;
    }

    return await this.documentRepository.save(document);
  }

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
