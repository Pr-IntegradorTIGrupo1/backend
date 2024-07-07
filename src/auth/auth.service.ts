import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dotenv from 'dotenv';
import { User, UserResponse } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ValidateTokenInput } from './dto/validate-token.input';
import { Project } from 'src/project/entities/project.entity';
const jwt = require('jsonwebtoken');

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async validateToken(input: ValidateTokenInput): Promise<User> {
    const decoded = jwt.verify(input.token, process.env.JWT_SECRET);
    let found = await this.userRepository.findOne({
      where: { rut: decoded.rut },
      relations: ['projects'],
    });
    if (!found) {
      let user = this.userRepository.create({
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
        rut: decoded.rut,
      });

      const projects = await this.projectRepository.find();

      const randomIndex = Math.floor(Math.random() * projects.length);
      const selectedProject = projects[randomIndex];

      user.projects = [selectedProject];

      await this.userRepository.save(user);
      const newUser = await this.userRepository.findOne({
        where: { rut: decoded.rut },
        relations: ['projects'],
      });
      return newUser;
    } else {
      found.firstName = decoded.firstName;
      found.lastName = decoded.lastName;
      found.email = decoded.email;
      this.userRepository.save(found);
      return found;
    }
  }
}
