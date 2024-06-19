import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DocumentService } from './document.service';
import { Document } from './entities/document.entity';
import { Template } from './entities/template.entity';
import { CreateDocumentInput } from './dto/create-document.input';
import { CreateTemplateInput } from './dto/create-template.input';

@Resolver(() => Document)
export class DocumentResolver {
  constructor(private readonly documentService: DocumentService) {}

  @Query(() => Document)
  getDocument(@Args('id', { type: () => Int }) id: number) {
    try {
      return this.documentService.getDocument(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Query(() => [Document])
  async getDocumentsByUser(
    @Args('id_user', { type: () => Int }) id_user: number,
  ) {
    try {
      return await this.documentService.getDocumentsByUser(id_user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Query(() => [Document])
  async getAllDocument() {
    try {
      return await this.documentService.getAllDocument();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Document)
  createDocument(@Args('input') createDocumentInput: CreateDocumentInput) {
    try {
      return this.documentService.createDocument(createDocumentInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

@Resolver(() => Template)
export class TemplateResolver {
  constructor(private readonly documentService: DocumentService) {}

  @Query(() => Template)
  getTemplate(@Args('id', { type: () => Int }) id: number) {
    try {
      return this.documentService.getTemplate(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Query(() => [Template])
  async getAllTemplate() {
    try {
      return await this.documentService.getAllTemplate();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Template)
  createTemplate(@Args('input') createTemplateInput: CreateTemplateInput) {
    try {
      return this.documentService.createTemplate(createTemplateInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
