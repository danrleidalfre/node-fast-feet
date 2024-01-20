import { Module } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { UsersRepository } from '@/domain/delivery/application/repositories/users-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { DeliverymansRepository } from '@/domain/delivery/application/repositories/deliverymans-repository'
import { PrismaDeliverymansRepository } from '@/infra/database/prisma/repositories/prisma-deliverymans-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: DeliverymansRepository,
      useClass: PrismaDeliverymansRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, DeliverymansRepository],
})
export class DatabaseModule {}
