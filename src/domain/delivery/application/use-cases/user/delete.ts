import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@/domain/delivery/application/repositories/users-repository'
import CPF from 'cpf-check'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface DeleteUserUseCaseRequest {
  cpf: string
}

type DeleteUserUseCaseResponse = Either<ResourceNotFoundError, object>

@Injectable()
export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    cpf,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const stripedCpf = CPF.strip(cpf)

    const user = await this.usersRepository.findByCpf(stripedCpf)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    await this.usersRepository.delete(user)

    return right({})
  }
}
