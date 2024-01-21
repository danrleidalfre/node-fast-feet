import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { Order } from '@/domain/delivery/enterprise/entities/order'
import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository'

interface UpdateOrderUseCaseRequest {
  orderId: string
  address: string
}

type UpdateOrderUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    order: Order
  }
>

@Injectable()
export class UpdateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
    address,
  }: UpdateOrderUseCaseRequest): Promise<UpdateOrderUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    order.address = address

    await this.ordersRepository.update(order)

    return right({ order })
  }
}
