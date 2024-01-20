import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface DeliverymanProps {
  userId?: UniqueEntityId | null
  name: string
  cpf: string
  email: string
}

export class Deliveryman extends Entity<DeliverymanProps> {
  get userId() {
    return this.props.userId
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get cpf() {
    return this.props.cpf
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  static create(
    props: Optional<DeliverymanProps, 'userId'>,
    id?: UniqueEntityId,
  ) {
    return new Deliveryman(
      {
        ...props,
        userId: props.userId ?? null,
      },
      id,
    )
  }
}
