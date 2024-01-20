import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface OrderProps {
  deliverymanId: UniqueEntityId
  receiverId: UniqueEntityId
  address: string
  createdAt: Date
  availableAt?: Date
  withdrawalAt?: Date
  deliveredAt?: Date
  returnedAt?: Date
  photoUrl?: string
}

export class Order extends Entity<OrderProps> {
  static create(props: OrderProps, id?: UniqueEntityId) {
    return new Order(props, id)
  }
}
