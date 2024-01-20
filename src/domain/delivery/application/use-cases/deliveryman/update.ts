import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { Deliveryman } from '@/domain/delivery/enterprise/entities/deliveryman'
import { DeliverymansRepository } from '@/domain/delivery/application/repositories/deliverymans-repository'

interface UpdateDeliverymanUseCaseRequest {
  deliverymanId: string
  name: string
  email: string
}

type UpdateDeliverymanUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    deliveryman: Deliveryman
  }
>

@Injectable()
export class UpdateDeliverymanUseCase {
  constructor(private deliverymansRepository: DeliverymansRepository) {}

  async execute({
    deliverymanId,
    name,
    email,
  }: UpdateDeliverymanUseCaseRequest): Promise<UpdateDeliverymanUseCaseResponse> {
    const deliveryman =
      await this.deliverymansRepository.findById(deliverymanId)

    if (!deliveryman) {
      return left(new ResourceNotFoundError())
    }

    deliveryman.name = name
    deliveryman.email = email

    await this.deliverymansRepository.update(deliveryman)

    return right({ deliveryman })
  }
}
