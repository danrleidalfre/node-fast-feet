import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { Order } from '@/domain/delivery/enterprise/entities/order'
import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository'
import { DeliverymansRepository } from '@/domain/delivery/application/repositories/deliverymans-repository'
import { UnauthorizedError } from '@/core/errors/unauthorized-error'
import { InvalidStatusError } from '@/core/errors/invalid-status-error'

interface UpdateDeliveryUseCaseRequest {
  orderId: string
  userId: string
  status: string
}

type UpdateDeliveryUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError | InvalidStatusError,
  {
    order: Order
  }
>

@Injectable()
export class UpdateDeliveryUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private deliverymansRepository: DeliverymansRepository,
  ) {}

  async execute({
    orderId,
    userId,
    status,
  }: UpdateDeliveryUseCaseRequest): Promise<UpdateDeliveryUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    if (status === 'waiting') {
      order.availableAt = new Date()
    } else if (
      status === 'withdrawal' ||
      status === 'delivered' ||
      status === 'returned'
    ) {
      const deliveryman = await this.deliverymansRepository.findByUserId(userId)

      if (!deliveryman) {
        return left(new ResourceNotFoundError())
      }

      if (status === 'withdrawal') {
        order.deliverymanId = deliveryman.id
        order.withdrawalAt = new Date()
      } else if (status === 'delivered' || status === 'returned') {
        if (order.deliverymanId?.toString() !== deliveryman.id.toString()) {
          return left(new UnauthorizedError())
        }

        if (status === 'delivered') {
          order.deliveredAt = new Date()
        } else {
          order.returnedAt = new Date()
        }
      }
    } else {
      return left(new InvalidStatusError())
    }

    await this.ordersRepository.update(order)

    return right({ order })
  }
}
