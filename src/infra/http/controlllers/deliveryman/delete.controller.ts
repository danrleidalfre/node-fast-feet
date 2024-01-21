import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common'
import { DeleteDeliverymanUseCase } from '@/domain/delivery/application/use-cases/deliveryman/delete'
import { RoleGuard } from '@/infra/guards/role.guard'
import { Role } from '@/infra/guards/role.decorator'

@Controller('/deliverymans/:id')
export class DeleteDeliverymanController {
  constructor(private deleteDeliveryman: DeleteDeliverymanUseCase) {}

  @Delete()
  @UseGuards(RoleGuard)
  @Role('ADMIN')
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
