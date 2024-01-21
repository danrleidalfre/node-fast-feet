import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { UpdateOrderUseCase } from '@/domain/delivery/application/use-cases/order/update'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation'

const updateOrderBodySchema = z.object({
  address: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(updateOrderBodySchema)

type UpdateOrderBodySchema = z.infer<typeof updateOrderBodySchema>

@Controller('/orders/:id')
export class UpdateOrderController {
  constructor(private updateOrder: UpdateOrderUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: UpdateOrderBodySchema,
    @Param('id') orderId: string,
  ) {
    const { address } = body

    const result = await this.updateOrder.execute({
      address,
      orderId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
