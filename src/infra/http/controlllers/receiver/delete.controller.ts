import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common'
import { DeleteReceiverUseCase } from '@/domain/delivery/application/use-cases/receiver/delete'
import { RoleGuard } from '@/infra/guards/role.guard'
import { Role } from '@/infra/guards/role.decorator'

@Controller('/receivers/:id')
export class DeleteReceiverController {
  constructor(private deleteReceiver: DeleteReceiverUseCase) {}

  @Delete()
  @UseGuards(RoleGuard)
  @Role('ADMIN')
  @HttpCode(204)
  async handle(@Param('id') receiverId: string) {
    const result = await this.deleteReceiver.execute({
      receiverId,
    })

    if (result.isLeft()) {
      throw new NotFoundException()
    }
  }
}
