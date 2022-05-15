import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Root,
  InputType,
  Field,
} from '@nestjs/graphql'
import { Inject } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { User } from 'src/models/User'

@InputType()
class UserUniqueInput {
  @Field({ nullable: true })
  id: number

  @Field({ nullable: true })
  email: string
}

@Resolver(User)
export class UserResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

//   @ResolveField()
//   async posts(@Root() user: User, @Context() ctx): Promise<User> {
//     return this.prismaService.user
//       .findUnique({
//         where: {
//           id: user.id,
//         },
//       })
//   }

  @Query((returns) => [User], { nullable: true })
  async allUsers(@Context() ctx) {
    return this.prismaService.user.findMany()
  }
}