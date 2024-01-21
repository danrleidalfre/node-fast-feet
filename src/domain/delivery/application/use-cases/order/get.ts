import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository'
import { Order } from '@/domain/delivery/enterprise/entities/order'

interface GetOrderByIdUseCaseRequest {
  id: string
}

type GetOrderByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    order: Order
  }
>

@Injectable()
export class GetOrderByIdUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    id,
  }: GetOrderByIdUseCaseRequest): Promise<GetOrderByIdUseCaseResponse> {
    const order = await this.ordersRepository.findById(id)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    return right({ order })
  }
}
