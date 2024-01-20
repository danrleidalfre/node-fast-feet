import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { GetDeliverymanByIdUseCase } from '@/domain/delivery/application/use-cases/deliveryman/get'
import { DeliverymanPresenter } from '@/infra/http/presenters/deliveryman-presenter'

@Controller('/deliverymans/:id')
export class GetDeliverymanByIdController {
  constructor(private getDeliveryManById: GetDeliverymanByIdUseCase) {}

  @Get()
  async handle(@Param('id') id: string) {
    const result = await this.getDeliveryManById.execute({
      id,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      deliveryman: DeliverymanPresenter.toHTTP(result.value.deliveryman),
    }
  }
}
