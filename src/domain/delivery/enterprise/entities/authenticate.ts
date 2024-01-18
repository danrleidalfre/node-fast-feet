import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { WrongCredentialsError } from '@/domain/delivery/application/use-cases/errors/wrong-credentials-error'
import { UsersRepository } from '@/domain/delivery/application/repositories/users-repository'
import { Encrypt } from '@/domain/delivery/application/cryptography/encrypt'
import { HashComparer } from '@/domain/delivery/application/cryptography/hash-comparer'

interface AuthenticateUserUseCaseRequest {
  cpf: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypt: Encrypt,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByCpf(cpf)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypt.encrypt({
      sub: user.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
