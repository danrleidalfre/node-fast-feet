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
import { CreateReceiverUseCase } from '@/domain/delivery/application/use-cases/receiver/create'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { RoleGuard } from '@/infra/guards/role.guard'
import { Role } from '@/infra/guards/role.decorator'

const createReceiverBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  address: z.string(),
})

type CreateReceiverBodySchema = z.infer<typeof createReceiverBodySchema>

@Controller('/receivers')
export class CreateReceiverController {
  constructor(private createReceiver: CreateReceiverUseCase) {}

  @Post()
  @UseGuards(RoleGuard)
  @Role('ADMIN')
  @UsePipes(new ZodValidationPipe(createReceiverBodySchema))
  async handle(@Body() body: CreateReceiverBodySchema) {
    const { name, address, email } = body

    const result = await this.createReceiver.execute({
      name,
      email,
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
