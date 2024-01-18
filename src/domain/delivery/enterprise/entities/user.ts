import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface UserProps {
  cpf: string
  password: string
}

export class User extends Entity<UserProps> {
  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    return new User(props, id)
  }
}
