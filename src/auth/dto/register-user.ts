import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsIn, IsNotEmpty, Length, Matches } from "class-validator";
import * as moment from 'moment';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from "src/files/file.entity";

@InputType()
export class RegisterUserInput {
    @Length(10, 255)
    @Field()
    username: string;

    @IsNotEmpty()
    @Field()
    @Matches(/^[A-Z]\w*$/, {message: 'password must have first uppercase letter'})
    password: string;

    @IsArray()
    @IsIn(['admin', 'user'], { each: true, message: 'Roles must be either admin or user' })
    @Field(() => [String], {defaultValue: ['user']})
    roles: string[];

    @Field({nullable: true, defaultValue: false})
    isActive: boolean;

    @Field(() => GraphQLUpload)
    image: Promise<FileUpload>;

    @Field(() => String, {defaultValue: moment().toISOString()})
    created_at: string;

    @Field({defaultValue: ''})
    modified_At: string;

    @Field({defaultValue: ''})
    deleted_At: string;
}