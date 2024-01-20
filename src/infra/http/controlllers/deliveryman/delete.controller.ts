import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { DeleteDeliverymanUseCase } from '@/domain/delivery/application/use-cases/deliveryman/delete'

@Controller('/deliverymans/:id')
export class DeleteDeliverymanController {
  constructor(private deleteDeliveryman: DeleteDeliverymanUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') deliverymanId: string) {
    const result = await this.deleteDeliveryman.execute({
      deliverymanId,
    })

    if (result.isLeft()) {
      throw new NotFoundException()
    }
  }
}
