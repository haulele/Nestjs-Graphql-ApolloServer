import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { GraphQLJSONObject } from 'graphql-type-json'
import { ObjectId } from 'mongodb';
@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn()
  @Field(() => String)
  _id: ObjectId;

  @Column()
  @Field()
  username: string;

  @Column()
  @HideField()
  password: string;

  @Column()
  @Field(() => [String])
  roles: string[];

  @Column()
  @Field()
  isActive: boolean;

  @Column()
  @Field(() => [GraphQLJSONObject]) 
  image: {
    url: string;
    altText: string;
  }[];

  @Column()
  @Field()
  created_At: string;

  @Column()
  @Field()
  modified_At: string;

  @Column()
  @Field()
  deleted_At: string;
}
