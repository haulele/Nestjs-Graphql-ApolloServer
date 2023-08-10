import { InputType, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json'
@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => [String])
  roles: string[];

  @Field(() => [GraphQLJSONObject])
  image: { 
    url: string;
    altText: string;
  }[];

  @Field()
  isActive: boolean;

  @Field()
  created_At: string;

  @Field()
  modified_At: string;

  @Field()
  deleted_At: string;
}

