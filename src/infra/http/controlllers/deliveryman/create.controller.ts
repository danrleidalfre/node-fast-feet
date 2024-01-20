import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation'
import { CreateDeliverymanUseCase } from '@/domain/delivery/application/use-cases/deliveryman/create'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'

const createDeliverymanBodySchema = z.object({
  name: z.string(),
  cpf: z.string().min(14).max(14),
  email: z.string().email(),
})

type CreateDeliverymanBodySchema = z.infer<typeof createDeliverymanBodySchema>

@Controller('/deliverymans')
export class CreateDeliverymanController {
  constructor(private createDeliveryman: CreateDeliverymanUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createDeliverymanBodySchema))
  async handle(@Body() body: CreateDeliverymanBodySchema) {
    const { name, cpf, email } = body

    const result = await this.createDeliveryman.execute({
      name,
      cpf,
      email,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
