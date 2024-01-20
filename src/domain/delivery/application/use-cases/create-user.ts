import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { HashGenerator } from '@/domain/delivery/application/cryptography/hash-generator'
import { User } from '@/domain/delivery/enterprise/entities/user'
import { UserAlreadyExistsError } from '@/core/errors/user-already-exists-error'
import { UsersRepository } from '@/domain/delivery/application/repositories/users-repository'
import CPF from 'cpf-check'
import { CpfInvalidError } from '@/core/errors/cpf-invalid-error'

interface CreateUserUseCaseRequest {
  cpf: string
  password: string
}

type CreateUserUseCaseResponse = Either<
  UserAlreadyExistsError | CpfInvalidError,
  {
    user: User
  }
>

@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    cpf,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const stripedCpf = CPF.strip(cpf)

    const userWithSameCpf = await this.usersRepository.findByCpf(stripedCpf)

    if (userWithSameCpf) {
      return left(new UserAlreadyExistsError(cpf))
    }

    const isValidCpf = CPF.validate(stripedCpf)

    if (!isValidCpf) {
      return left(new CpfInvalidError(cpf))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      cpf: stripedCpf,
      password: hashedPassword,
      role: 'ADMIN',
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
