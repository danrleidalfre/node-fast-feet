import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation'
import { FetchReceiversUseCase } from '@/domain/delivery/application/use-cases/receiver/fetch'
import { ReceiverPresenter } from '@/infra/http/presenters/receiver-presenter'
import { RoleGuard } from '@/infra/guards/role.guard'
import { Role } from '@/infra/guards/role.decorator'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/receivers')
export class FetchReceiversController {
  constructor(private fetchReceivers: FetchReceiversUseCase) {}

  @Get()
  @UseGuards(RoleGuard)
  @Role('ADMIN')
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchReceivers.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { receivers } = result.value

    return { receivers: receivers?.map(ReceiverPresenter.toHTTP) }
  }
}
