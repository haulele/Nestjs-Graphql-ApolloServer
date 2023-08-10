import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User>{
    return this.usersService.createUser(createUserInput);
  } 


  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  findAll() {
    return this.usersService.findAll();
  }

  
  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  findOneWithResizedImage(@Args('username') username: string,
  @Args('imagesize') imagesize: string) {
    return this.usersService.FindOneWithResizedImage(username, imagesize);
  }

}
