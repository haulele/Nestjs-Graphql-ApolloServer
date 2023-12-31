import * as moment from 'moment';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  username: string;

  @Field(() => String, {defaultValue: moment().toISOString()})
  modified_At: string;
}
