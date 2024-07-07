import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project, ProjectResponse } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => ProjectResponse)
  createProject(@Args('input') createProjectInput: CreateProjectInput) {
    return this.projectService.createProject(createProjectInput);
  }

  @Query(() => [Project], { name: 'project' })
  findAll() {
    return this.projectService.findAll();
  }
}
