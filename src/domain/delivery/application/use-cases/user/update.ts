import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { User } from '@/domain/delivery/enterprise/entities/user'
import { UsersRepository } from '@/domain/delivery/application/repositories/users-repository'
import { HashGenerator } from '@/domain/delivery/application/cryptography/hash-generator'

interface UpdateUserUseCaseRequest {
  userId: string
  password: string
}

type UpdateUserUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    userId,
    password,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    user.password = await this.hashGenerator.hash(password)

    await this.usersRepository.update(user)

    return right({ user })
  }
}
