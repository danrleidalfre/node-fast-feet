import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  NotFoundException,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation'
import { DeleteUserUseCase } from '@/domain/delivery/application/use-cases/user/delete'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { RoleGuard } from '@/infra/guards/role.guard'
import { Role } from '@/infra/guards/role.decorator'

const deleteUserBodySchema = z.object({
  cpf: z.string().min(14).max(14),
})

type DeleteUserBodySchema = z.infer<typeof deleteUserBodySchema>

@Controller('/users')
export class DeleteUserController {
  constructor(private deleteUser: DeleteUserUseCase) {}

  @Delete()
  @UseGuards(RoleGuard)
  @Role('ADMIN')
  @UsePipes(new ZodValidationPipe(deleteUserBodySchema))
  async handle(@Body() body: DeleteUserBodySchema) {
    const { cpf } = body

    const result = await this.deleteUser.execute({
      cpf,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
