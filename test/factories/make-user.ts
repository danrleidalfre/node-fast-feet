import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/delivery/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaUserMapper } from '@/infra/database/prisma/mappers/prisma-user-mapper'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId,
) {
  return User.create(
    {
      cpf: '00000000000',
      password: faker.internet.password(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
    const user = makeUser(data)

    await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    })

    return user
  }
}
