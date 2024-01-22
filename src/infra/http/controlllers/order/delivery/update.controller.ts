import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { UpdateDeliveryUseCase } from '@/domain/delivery/application/use-cases/order/delivery/update'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { UnauthorizedError } from '@/core/errors/unauthorized-error'
import { InvalidStatusError } from '@/core/errors/invalid-status-error'

const updateDeliveryBodySchema = z.object({
  status: z.enum(['waiting', 'withdrawal', 'delivered', 'returned']),
})

const bodyValidationPipe = new ZodValidationPipe(updateDeliveryBodySchema)

type UpdateDeliveryBodySchema = z.infer<typeof updateDeliveryBodySchema>

@Controller('/deliveries/:id')
export class UpdateDeliveryController {
  constructor(private updateDelivery: UpdateDeliveryUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: UpdateDeliveryBodySchema,
    @Param('id') orderId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { status } = body
    const userId = user.sub

    const result = await this.updateDelivery.execute({
      orderId,
      userId,
      status,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new ConflictException(error.message)
        case UnauthorizedError:
          throw new UnauthorizedException(error.message)
        case InvalidStatusError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
