import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeORM.config';
import { JwtStrategy } from './auth/jwt.strategy';
import { RolesGuard } from './auth/guard/role.guard';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    driver: ApolloDriver,
  }),
  UsersModule,  
  AuthModule,
  TypeOrmModule.forRoot(typeOrmConfig),
],
providers: [
  {
    provide: JwtStrategy,
    useClass: RolesGuard,
  },
],
})
export class AppModule {}
