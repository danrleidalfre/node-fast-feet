import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { DeleteReceiverUseCase } from '@/domain/delivery/application/use-cases/receiver/delete'

@Controller('/receivers/:id')
export class DeleteReceiverController {
  constructor(private deleteReceiver: DeleteReceiverUseCase) {}

  @Delete()
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
