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
import { UpdateUserUseCase } from '@/domain/delivery/application/use-cases/user/update'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation'
import { RoleGuard } from '@/infra/guards/role.guard'
import { Role } from '@/infra/guards/role.decorator'

const updateUserBodySchema = z.object({
  password: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(updateUserBodySchema)

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>

@Controller('/users/:id')
export class UpdateUserController {
  constructor(private updateUser: UpdateUserUseCase) {}

  @Put()
  @UseGuards(RoleGuard)
  @Role('ADMIN')
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: UpdateUserBodySchema,
    @Param('id') userId: string,
  ) {
    const { password } = body

    const result = await this.updateUser.execute({
      userId,
      password,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
