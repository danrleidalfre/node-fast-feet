import { BadRequestException, Body, Controller, Get } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation'
import { FetchDeliveriesNearbyUseCase } from '@/domain/delivery/application/use-cases/order/delivery/fetch-deliveries-nearby'
import { OrderPresenter } from '@/infra/http/presenters/order-presenter'

const fetchDeliveriesNearbyBodySchema = z.object({
  addressOrigin: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(
  fetchDeliveriesNearbyBodySchema,
)

type FetchDeliveryNearbyParamSchema = z.infer<
  typeof fetchDeliveriesNearbyBodySchema
>

@Controller('/deliveries/nearby')
export class FetchDeliveriesNearbyController {
  constructor(private fetchDeliveriesNearby: FetchDeliveriesNearbyUseCase) {}

  @Get()
  async handle(@Body(bodyValidationPipe) body: FetchDeliveryNearbyParamSchema) {
    const { addressOrigin } = body

    const result = await this.fetchDeliveriesNearby.execute({
      addressOrigin,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { orders } = result.value

    return { orders: orders?.map(OrderPresenter.toHTTP) }
  }
}
