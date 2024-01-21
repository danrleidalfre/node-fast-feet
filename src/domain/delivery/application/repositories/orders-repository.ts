import { Order } from '@/domain/delivery/enterprise/entities/order'
import { PaginationParams } from '@/core/repositories/pagination-params'

export abstract class OrdersRepository {
  abstract findById(id: string): Promise<Order | null>

  abstract findMany(params: PaginationParams): Promise<Order[] | null>

  abstract create(order: Order): Promise<void>

  abstract update(order: Order): Promise<void>

  abstract delete(order: Order): Promise<void>
}
