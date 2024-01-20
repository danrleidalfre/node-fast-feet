import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { DeliverymansRepository } from '@/domain/delivery/application/repositories/deliverymans-repository'
import { Deliveryman } from '@/domain/delivery/enterprise/entities/deliveryman'

interface GetDeliverymanByIdUseCaseRequest {
  id: string
}

type GetDeliverymanByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    deliveryman: Deliveryman
  }
>

@Injectable()
export class GetDeliverymanByIdUseCase {
  constructor(private deliverymansRepository: DeliverymansRepository) {}

  async execute({
    id,
  }: GetDeliverymanByIdUseCaseRequest): Promise<GetDeliverymanByIdUseCaseResponse> {
    const deliveryman = await this.deliverymansRepository.findById(id)

    if (!deliveryman) {
      return left(new ResourceNotFoundError())
    }

    return right({ deliveryman })
  }
}
