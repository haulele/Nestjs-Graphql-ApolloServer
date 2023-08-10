import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guard/gql-app.guard';
import { User } from 'src/users/entities/user.entity';
import { RegisterUserInput } from './dto/register-user';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)    
    async login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
        return this.authService.login(context.user);
    }

    @Mutation(() => User)
    signup(@Args('registerUserInput') registerUserInput: RegisterUserInput) {
        return this.authService.signup(registerUserInput);
    }
}

