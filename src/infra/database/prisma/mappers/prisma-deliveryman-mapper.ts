import { Deliveryman as PrismaDeliveryman, Prisma } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Deliveryman } from '@/domain/delivery/enterprise/entities/deliveryman'

export class PrismaDeliverymanMapper {
  static toDomain(raw: PrismaDeliveryman): Deliveryman {
    return Deliveryman.create(
      {
        userId: raw.userId ? new UniqueEntityId(raw.userId) : null,
        name: raw.name,
        cpf: raw.cpf,
        email: raw.email,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    deliveryman: Deliveryman,
  ): Prisma.DeliverymanUncheckedCreateInput {
    return {
      id: deliveryman.id.toString(),
      userId: deliveryman?.userId?.toString(),
      name: deliveryman.name,
      cpf: deliveryman.cpf,
      email: deliveryman.email,
    }
  }
}
