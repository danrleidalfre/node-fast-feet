import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'
import { PaginationParams } from '@/core/repositories/pagination-params'

export abstract class ReceiversRepository {
  abstract findById(id: string): Promise<Receiver | null>

  abstract findByEmail(email: string): Promise<Receiver | null>

  abstract findMany(params: PaginationParams): Promise<Receiver[] | null>

  abstract create(receiver: Receiver): Promise<void>

  abstract update(receiver: Receiver): Promise<void>

  abstract delete(receiver: Receiver): Promise<void>
}
