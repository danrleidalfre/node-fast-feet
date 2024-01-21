import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository'
import { Order } from '@/domain/delivery/enterprise/entities/order'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface FetchOrdersUseCaseRequest {
  page: number
}

type FetchOrdersUseCaseResponse = Either<
  null,
  {
    orders: Order[] | null
  }
>

@Injectable()
export class FetchOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    page,
  }: FetchOrdersUseCaseRequest): Promise<FetchOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.findMany({ page })

    return right({ orders })
  }
}
