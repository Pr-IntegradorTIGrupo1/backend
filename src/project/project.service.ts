import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, ProjectResponse } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async createProject(input: CreateProjectInput): Promise<ProjectResponse> {
    const project = this.projectRepository.create(input);
    await this.projectRepository.save(project);

    const success = true;
    const message = 'Proyecto creado exitosamente';
    const response = { success, message };

    return response;
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }
}
