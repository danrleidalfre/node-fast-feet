import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation'
import { CreateOrderUseCase } from '@/domain/delivery/application/use-cases/order/create'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { RoleGuard } from '@/infra/guards/role.guard'
import { Role } from '@/infra/guards/role.decorator'

const createOrderBodySchema = z.object({
  receiverId: z.string().uuid(),
  address: z.string(),
})

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>

@Controller('/orders')
export class CreateOrderController {
  constructor(private createOrder: CreateOrderUseCase) {}

  @Post()
  @UseGuards(RoleGuard)
  @Role('ADMIN')
  @UsePipes(new ZodValidationPipe(createOrderBodySchema))
  async handle(@Body() body: CreateOrderBodySchema) {
    const { receiverId, address } = body

    const result = await this.createOrder.execute({
      receiverId,
      address,
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
