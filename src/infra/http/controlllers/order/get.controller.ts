import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { GetOrderByIdUseCase } from '@/domain/delivery/application/use-cases/order/get'
import { OrderPresenter } from '@/infra/http/presenters/order-presenter'

@Controller('/orders/:id')
export class GetOrderByIdController {
  constructor(private getDeliveryManById: GetOrderByIdUseCase) {}

  @Get()
  async handle(@Param('id') id: string) {
    const result = await this.getDeliveryManById.execute({
      id,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      order: OrderPresenter.toHTTP(result.value.order),
    }
  }
}
