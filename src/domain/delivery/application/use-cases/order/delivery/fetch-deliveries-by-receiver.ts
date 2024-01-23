import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository'
import { Order } from '@/domain/delivery/enterprise/entities/order'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface FetchDeliveriesByReceiverUseCaseRequest {
  receiverId: string
  page: number
}

type FetchDeliveriesByReceiverUseCaseResponse = Either<
  null,
  {
    orders: Order[] | null
  }
>

@Injectable()
export class FetchDeliveriesByReceiverUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    receiverId,
    page,
  }: FetchDeliveriesByReceiverUseCaseRequest): Promise<FetchDeliveriesByReceiverUseCaseResponse> {
    const orders = await this.ordersRepository.findManyByReceiver(receiverId, {
      page,
    })

    return right({ orders })
  }
}
