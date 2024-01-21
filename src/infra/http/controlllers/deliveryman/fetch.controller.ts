import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation'
import { FetchDeliverymansUseCase } from '@/domain/delivery/application/use-cases/deliveryman/fetch'
import { DeliverymanPresenter } from '@/infra/http/presenters/deliveryman-presenter'
import { Role } from '@/infra/guards/role.decorator'
import { RoleGuard } from '@/infra/guards/role.guard'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/deliverymans')
export class FetchDeliverymansController {
  constructor(private fetchDeliverymans: FetchDeliverymansUseCase) {}

  @Get()
  @UseGuards(RoleGuard)
  @Role('ADMIN')
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchDeliverymans.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { deliverymans } = result.value

    return { deliverymans: deliverymans?.map(DeliverymanPresenter.toHTTP) }
  }
}
