import { UniqueEntityId } from './unique-entity-id'

export abstract class Entity<Props> {
  protected props: Props
  private readonly _id: UniqueEntityId

  protected constructor(props: Props, id?: UniqueEntityId) {
    this.props = props
    this._id = id ?? new UniqueEntityId()
  }

  get id() {
    return this._id
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true
    }

    return entity.id === this._id
  }
}
