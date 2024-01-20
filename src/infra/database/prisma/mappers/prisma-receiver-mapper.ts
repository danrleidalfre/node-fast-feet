import { Prisma, Receiver as PrismaReceiver } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'

export class PrismaReceiverMapper {
  static toDomain(raw: PrismaReceiver): Receiver {
    return Receiver.create(
      {
        name: raw.name,
        address: raw.address,
        email: raw.email,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(receiver: Receiver): Prisma.ReceiverUncheckedCreateInput {
    return {
      id: receiver.id.toString(),
      name: receiver.name,
      address: receiver.address,
      email: receiver.email,
    }
  }
}
