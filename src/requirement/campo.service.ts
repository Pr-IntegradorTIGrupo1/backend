import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Campo } from './entities/campo.entity';
import { Requirement } from './entities/requirement.entity';
import { EditCampoDto } from './dto/edit-campo.dto';

@Injectable()
export class CampoService {
  constructor(
    @InjectRepository(Campo)
    private readonly campoRepository: Repository<Campo>,
  ) {}

  async createCampo(
    title: string,
    cuerpo: string,
    requirement: Requirement,
  ): Promise<Campo> {
    const campo = new Campo();
    campo.cuerpo = cuerpo;
    campo.title = title;
    //asociar requirimiento al campo
    campo.requirement = requirement;
    return await this.campoRepository.save(campo);
  }

  async editCampo(input: EditCampoDto): Promise<Campo> {
    try {
      const { title, cuerpo, id } = input;
      const campo = await this.campoRepository.findOneOrFail({ where: { id } });

      //editamos los campos del campo
      campo.title = title;
      campo.cuerpo = cuerpo;

      return campo;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Campo with id ${input.id} not found`);
      } else {
        throw error;
      }
    }
  }
  async remove(id: number): Promise<Campo> {
    try {
      const campo = await this.campoRepository.findOneOrFail({ where: { id } });
      // Si se encuentra, elimina la entidad.
      await this.campoRepository.remove(campo);
      return campo;
    } catch (error) {
      // Maneja específicamente el error si la entidad no se encuentra.
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Campo with id ${id} not found`);
      } else {
        // Vuelve a lanzar otros errores.
        throw error;
      }
    }
  }
}
