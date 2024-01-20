import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { ReceiversRepository } from '@/domain/delivery/application/repositories/receivers-repository'
import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'

interface GetReceiverByIdUseCaseRequest {
  id: string
}

type GetReceiverByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    receiver: Receiver
  }
>

@Injectable()
export class GetReceiverByIdUseCase {
  constructor(private receiversRepository: ReceiversRepository) {}

  async execute({
    id,
  }: GetReceiverByIdUseCaseRequest): Promise<GetReceiverByIdUseCaseResponse> {
    const receiver = await this.receiversRepository.findById(id)

    if (!receiver) {
      return left(new ResourceNotFoundError())
    }

    return right({ receiver })
  }
}
