import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common'
import { GetReceiverByIdUseCase } from '@/domain/delivery/application/use-cases/receiver/get'
import { ReceiverPresenter } from '@/infra/http/presenters/receiver-presenter'
import { RoleGuard } from '@/infra/guards/role.guard'
import { Role } from '@/infra/guards/role.decorator'

@Controller('/receivers/:id')
export class GetReceiverByIdController {
  constructor(private getReceiverById: GetReceiverByIdUseCase) {}

  @Get()
  @UseGuards(RoleGuard)
  @Role('ADMIN')
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
