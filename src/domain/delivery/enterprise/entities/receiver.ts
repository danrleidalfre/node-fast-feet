import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface ReceiverProps {
  name: string
  email: string
  address: string
}

export class Receiver extends Entity<ReceiverProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get address() {
    return this.props.address
  }

  set address(address: string) {
    this.props.address = address
  }

  static create(props: ReceiverProps, id?: UniqueEntityId) {
    return new Receiver(props, id)
  }
}
