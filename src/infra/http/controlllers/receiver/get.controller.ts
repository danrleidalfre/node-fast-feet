import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { GetReceiverByIdUseCase } from '@/domain/delivery/application/use-cases/receiver/get'
import { ReceiverPresenter } from '@/infra/http/presenters/receiver-presenter'

@Controller('/receivers/:id')
export class GetReceiverByIdController {
  constructor(private getReceiverById: GetReceiverByIdUseCase) {}

  @Get()
  async handle(@Param('id') id: string) {
    const result = await this.getReceiverById.execute({
      id,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      receiver: ReceiverPresenter.toHTTP(result.value.receiver),
    }
  }
}
