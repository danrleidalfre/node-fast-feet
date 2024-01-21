import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface DeleteOrderUseCaseRequest {
  orderId: string
}

type DeleteOrderUseCaseResponse = Either<ResourceNotFoundError, object>

@Injectable()
export class DeleteOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
  }: DeleteOrderUseCaseRequest): Promise<DeleteOrderUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    await this.ordersRepository.delete(order)

    return right({})
  }
}
