import { Deliveryman } from '@/domain/delivery/enterprise/entities/deliveryman'
import { PaginationParams } from '@/core/repositories/pagination-params'

export abstract class DeliverymansRepository {
  abstract findById(id: string): Promise<Deliveryman | null>

  abstract findByUserId(id: string): Promise<Deliveryman | null>

  abstract findByCpf(cpf: string): Promise<Deliveryman | null>

  abstract findMany(params: PaginationParams): Promise<Deliveryman[] | null>

  abstract create(deliveryman: Deliveryman): Promise<void>

  abstract update(deliveryman: Deliveryman): Promise<void>

  abstract delete(deliveryman: Deliveryman): Promise<void>
}
