import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { UpdateDeliverymanUseCase } from '@/domain/delivery/application/use-cases/deliveryman/update'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation'

const updateDeliverymanBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
})

const bodyValidationPipe = new ZodValidationPipe(updateDeliverymanBodySchema)

type UpdateDeliverymanBodySchema = z.infer<typeof updateDeliverymanBodySchema>

@Controller('/deliverymans/:id')
export class UpdateDeliverymanController {
  constructor(private updateDeliveryman: UpdateDeliverymanUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: UpdateDeliverymanBodySchema,
    @Param('id') deliverymanId: string,
  ) {
    const { name, email } = body

    const result = await this.updateDeliveryman.execute({
      name,
      email,
      deliverymanId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
