import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface OrderProps {
  deliverymanId?: UniqueEntityId | null
  receiverId: UniqueEntityId
  address: string
  createdAt: Date
  availableAt?: Date | null
  withdrawalAt?: Date | null
  deliveredAt?: Date | null
  returnedAt?: Date | null
  photoUrl?: string | null
}

export class Order extends Entity<OrderProps> {
  get deliverymanId() {
    return this.props.deliverymanId
  }

  set deliverymanId(deliverymanId: UniqueEntityId | undefined | null) {
    this.props.deliverymanId = deliverymanId
  }

  get receiverId() {
    return this.props.receiverId
  }

  get address() {
    return this.props.address
  }

  set address(address: string) {
    this.props.address = address
  }

  get createdAt() {
    return this.props.createdAt
  }

  get availableAt() {
    return this.props.availableAt
  }

  set availableAt(availableAt: Date | undefined | null) {
    this.props.availableAt = availableAt
  }

  get withdrawalAt() {
    return this.props.withdrawalAt
  }

  set withdrawalAt(withdrawalAt: Date | undefined | null) {
    this.props.withdrawalAt = withdrawalAt
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  set deliveredAt(deliveredAt: Date | undefined | null) {
    this.props.deliveredAt = deliveredAt
  }

  get returnedAt() {
    return this.props.returnedAt
  }

  set returnedAt(returnedAt: Date | undefined | null) {
    this.props.returnedAt = returnedAt
  }

  get photoUrl() {
    return this.props.photoUrl
  }

  static create(props: Optional<OrderProps, 'createdAt'>, id?: UniqueEntityId) {
    return new Order(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
