import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
class UserPaginationMeta {
  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  itemCount: number;

  @Field(() => Int)
  itemsPerPage: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;
}

@ObjectType()
export class UserPagination {
  @Field(() => [User])
  items: User[];

  @Field(() => UserPaginationMeta)
  meta: UserPaginationMeta;

  @Field(() => String, { nullable: true })
  links?: string;
}