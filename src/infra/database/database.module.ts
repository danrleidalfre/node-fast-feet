import { Module } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { UsersRepository } from '@/domain/delivery/application/repositories/users-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { DeliverymansRepository } from '@/domain/delivery/application/repositories/deliverymans-repository'
import { PrismaDeliverymansRepository } from '@/infra/database/prisma/repositories/prisma-deliverymans-repository'
import { ReceiversRepository } from '@/domain/delivery/application/repositories/receivers-repository'
import { PrismaReceiversRepository } from '@/infra/database/prisma/repositories/prisma-receivers-repository'
import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository'
import { PrismaOrdersRepository } from '@/infra/database/prisma/repositories/prisma-orders-repository'

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
    {
      provide: ReceiversRepository,
      useClass: PrismaReceiversRepository,
    },
    {
      provide: OrdersRepository,
      useClass: PrismaOrdersRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    DeliverymansRepository,
    ReceiversRepository,
    OrdersRepository,
  ],
})
export class DatabaseModule {}
