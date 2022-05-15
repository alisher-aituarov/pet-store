import 'reflect-metadata'
import { ObjectType, Field, Int } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number

  @Field()
  @IsEmail()
  email: string

  @Field((type) => String, { nullable: false })
  name: string | null

}