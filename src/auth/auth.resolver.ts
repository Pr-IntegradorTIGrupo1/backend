import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ValidateTokenInput } from './dto/validate-token.input';
import { User, UserResponse } from 'src/user/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async validateToken(@Args('input') validateTokenInput: ValidateTokenInput) {
    try {
      return await this.authService.validateToken(validateTokenInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
