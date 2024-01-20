import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation'
import { AuthenticateUseCase } from '@/domain/delivery/application/use-cases/authenticate'
import { WrongCredentialsError } from '@/core/errors/wrong-credentials-error'
import { Public } from '@/infra/auth/public'
import CPF from 'cpf-check'

const authenticateBodySchema = z.object({
  cpf: z.string().min(14).max(14),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(private authenticate: AuthenticateUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { cpf, password } = body

    const cpfIsValid = CPF.validate(cpf)

    if (!cpfIsValid) {
      throw new UnauthorizedException()
    }

    const result = await this.authenticate.execute({
      cpf: CPF.strip(cpf),
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
