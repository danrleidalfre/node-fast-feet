import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation'
import { OrderPresenter } from '@/infra/http/presenters/order-presenter'
import { RoleGuard } from '@/infra/guards/role.guard'
import { Role } from '@/infra/guards/role.decorator'
import { FetchDeliveriesByReceiverUseCase } from '@/domain/delivery/application/use-cases/order/delivery/fetch-deliveries-by-receiver'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/deliveries/receiver/:id')
export class FetchDeliveriesByReceiverController {
  constructor(private fetchOrders: FetchDeliveriesByReceiverUseCase) {}

  @Get()
  @UseGuards(RoleGuard)
  @Role('ADMIN')
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('id') receiverId: string,
  ) {
    const result = await this.fetchOrders.execute({
      receiverId,
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { orders } = result.value

    return { orders: orders?.map(OrderPresenter.toHTTP) }
  }
}
