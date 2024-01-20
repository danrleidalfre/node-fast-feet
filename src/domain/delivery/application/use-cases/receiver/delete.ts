import { ReceiversRepository } from '@/domain/delivery/application/repositories/receivers-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface DeleteReceiverUseCaseRequest {
  receiverId: string
}

type DeleteReceiverUseCaseResponse = Either<ResourceNotFoundError, object>

@Injectable()
export class DeleteReceiverUseCase {
  constructor(private receiversRepository: ReceiversRepository) {}

  async execute({
    receiverId,
  }: DeleteReceiverUseCaseRequest): Promise<DeleteReceiverUseCaseResponse> {
    const receiver = await this.receiversRepository.findById(receiverId)

    if (!receiver) {
      return left(new ResourceNotFoundError())
    }

    await this.receiversRepository.delete(receiver)

    return right({})
  }
}
