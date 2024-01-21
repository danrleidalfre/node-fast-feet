import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation'
import { FetchOrdersUseCase } from '@/domain/delivery/application/use-cases/order/fetch'
import { OrderPresenter } from '@/infra/http/presenters/order-presenter'
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

@Controller('/orders')
export class FetchOrdersController {
  constructor(private fetchOrders: FetchOrdersUseCase) {}

  @Get()
  @UseGuards(RoleGuard)
  @Role('ADMIN')
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchOrders.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { orders } = result.value

    return { orders: orders?.map(OrderPresenter.toHTTP) }
  }
}
