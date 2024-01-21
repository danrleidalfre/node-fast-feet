import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository'
import { Order } from '@/domain/delivery/enterprise/entities/order'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface CreateOrderUseCaseRequest {
  receiverId: string
  address: string
}

type CreateOrderUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    order: Order
  }
>

@Injectable()
export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    receiverId,
    address,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      receiverId: new UniqueEntityId(receiverId),
      address,
    })

    await this.ordersRepository.create(order)

    return right({
      order,
    })
  }
}
