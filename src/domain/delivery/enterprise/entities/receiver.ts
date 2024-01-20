import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface ReceiverProps {
  userId: UniqueEntityId
  email: string
  name: string
}

export class Receiver extends Entity<ReceiverProps> {
  static create(props: ReceiverProps, id?: UniqueEntityId) {
    return new Receiver(props, id)
  }
}
