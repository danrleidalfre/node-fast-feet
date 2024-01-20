import { DeliverymansRepository } from '@/domain/delivery/application/repositories/deliverymans-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@/domain/delivery/application/repositories/users-repository'

interface DeleteDeliverymanUseCaseRequest {
  deliverymanId: string
}

type DeleteDeliverymanUseCaseResponse = Either<ResourceNotFoundError, object>

@Injectable()
export class DeleteDeliverymanUseCase {
  constructor(
    private deliverymansRepository: DeliverymansRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    deliverymanId,
  }: DeleteDeliverymanUseCaseRequest): Promise<DeleteDeliverymanUseCaseResponse> {
    const deliveryman =
      await this.deliverymansRepository.findById(deliverymanId)

    if (!deliveryman) {
      return left(new ResourceNotFoundError())
    }

    const userCpf = deliveryman.cpf

    await this.deliverymansRepository.delete(deliveryman)

    const user = await this.usersRepository.findByCpf(userCpf)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    await this.usersRepository.delete(user)

    return right({})
  }
}
