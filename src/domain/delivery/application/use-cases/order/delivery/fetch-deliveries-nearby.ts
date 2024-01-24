import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository'
import { Order } from '@/domain/delivery/enterprise/entities/order'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { GeocodingService } from '@/infra/services/geocoding.service'
import { getDistance } from 'geolib'

interface FetchDeliveriesNearbyUseCaseRequest {
  addressOrigin: string
}

type FetchDeliveriesNearbyUseCaseResponse = Either<
  null,
  {
    orders: Order[] | null
  }
>

@Injectable()
export class FetchDeliveriesNearbyUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private geocodingService: GeocodingService,
  ) {}

  async execute({
    addressOrigin,
  }: FetchDeliveriesNearbyUseCaseRequest): Promise<FetchDeliveriesNearbyUseCaseResponse> {
    const available = await this.ordersRepository.findManyAvailable()

    const ordersNearby = await Promise.all(
      (available || []).map(async (order) => {
        const origin = await this.geocodingService.getCoordinates(addressOrigin)
        const destination = await this.geocodingService.getCoordinates(
          order.address,
        )

        const distance = getDistance(origin, destination) / 1000

        if (distance < 50) {
          return order
        }

        return null
      }),
    )

    const ordersFiltered = ordersNearby.filter((order) => order !== null)

    const ordersIds = ordersFiltered.map((x) => x?.id.toString())

    const orders = await this.ordersRepository.findManyByIds(ordersIds)

    return right({ orders })
  }
}
