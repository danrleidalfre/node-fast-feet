import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common'
import { DeleteOrderUseCase } from '@/domain/delivery/application/use-cases/order/delete'
import { RoleGuard } from '@/infra/guards/role.guard'
import { Role } from '@/infra/guards/role.decorator'

@Controller('/orders/:id')
export class DeleteOrderController {
  constructor(private deleteOrder: DeleteOrderUseCase) {}

  @Delete()
  @UseGuards(RoleGuard)
  @Role('ADMIN')
  @HttpCode(204)
  async handle(@Param('id') orderId: string) {
    const result = await this.deleteOrder.execute({
      orderId,
    })

    if (result.isLeft()) {
      throw new NotFoundException()
    }
  }
}
