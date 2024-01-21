import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { DeleteOrderUseCase } from '@/domain/delivery/application/use-cases/order/delete'

@Controller('/orders/:id')
export class DeleteOrderController {
  constructor(private deleteOrder: DeleteOrderUseCase) {}

  @Delete()
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
