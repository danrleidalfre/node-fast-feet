import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common'
import { GetDeliverymanByIdUseCase } from '@/domain/delivery/application/use-cases/deliveryman/get'
import { DeliverymanPresenter } from '@/infra/http/presenters/deliveryman-presenter'
import { RoleGuard } from '@/infra/guards/role.guard'
import { Role } from '@/infra/guards/role.decorator'

@Controller('/deliverymans/:id')
export class GetDeliverymanByIdController {
  constructor(private getDeliveryManById: GetDeliverymanByIdUseCase) {}

  @Get()
  @UseGuards(RoleGuard)
  @Role('ADMIN')
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
