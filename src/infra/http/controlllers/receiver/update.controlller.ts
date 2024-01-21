import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { UpdateReceiverUseCase } from '@/domain/delivery/application/use-cases/receiver/update'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation'
import { RoleGuard } from '@/infra/guards/role.guard'
import { Role } from '@/infra/guards/role.decorator'

const updateReceiverBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  address: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(updateReceiverBodySchema)

type UpdateReceiverBodySchema = z.infer<typeof updateReceiverBodySchema>

@Controller('/receivers/:id')
export class UpdateReceiverController {
  constructor(private updateReceiver: UpdateReceiverUseCase) {}

  @Put()
  @UseGuards(RoleGuard)
  @Role('ADMIN')
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: UpdateReceiverBodySchema,
    @Param('id') receiverId: string,
  ) {
    const { name, email, address } = body

    const result = await this.updateReceiver.execute({
      name,
      email,
      address,
      receiverId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
