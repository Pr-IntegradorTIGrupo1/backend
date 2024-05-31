import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRequirementInput {
  @Field(() => Int, { description: 'ID del proyecto al que pertenece el requisito' })
  projectId: number;

  @Field(() => String, { description: 'Título del requisito' })
  title: string;

  @Field(() => String, { description: 'Descripción del requisito' })
  description: string;

  @Field(() => Int, { description: 'Prioridad del requisito', nullable: true })
  priority?: number;
}
