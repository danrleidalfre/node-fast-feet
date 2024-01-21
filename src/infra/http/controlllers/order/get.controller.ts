import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common'
import { GetOrderByIdUseCase } from '@/domain/delivery/application/use-cases/order/get'
import { OrderPresenter } from '@/infra/http/presenters/order-presenter'
import { RoleGuard } from '@/infra/guards/role.guard'
import { Role } from '@/infra/guards/role.decorator'

@Controller('/orders/:id')
export class GetOrderByIdController {
  constructor(private getDeliveryManById: GetOrderByIdUseCase) {}

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
      order: OrderPresenter.toHTTP(result.value.order),
    }
  }
}
