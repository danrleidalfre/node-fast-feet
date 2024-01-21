import { Order as PrismaOrder, Prisma } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/delivery/enterprise/entities/order'

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrder): Order {
    return Order.create(
      {
        deliverymanId: raw.deliverymanId
          ? new UniqueEntityId(raw.deliverymanId)
          : null,
        receiverId: new UniqueEntityId(raw.receiverId),
        address: raw.address,
        createdAt: raw.createdAt,
        availableAt: raw.availableAt,
        withdrawalAt: raw.withdrawalAt,
        deliveredAt: raw.deliveredAt,
        returnedAt: raw.returnedAt,
        photoUrl: raw.photoUrl,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id.toString(),
      deliverymanId: order.deliverymanId
        ? order.deliverymanId.toString()
        : null,
      receiverId: order.receiverId.toString(),
      address: order.address,
      createdAt: order.createdAt,
      availableAt: order.availableAt,
      withdrawalAt: order.withdrawalAt,
      deliveredAt: order.deliveredAt,
      returnedAt: order.returnedAt,
      photoUrl: order.photoUrl,
    }
  }
}
