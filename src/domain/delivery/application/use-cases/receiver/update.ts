import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'
import { ReceiversRepository } from '@/domain/delivery/application/repositories/receivers-repository'

interface UpdateReceiverUseCaseRequest {
  receiverId: string
  name: string
  email: string
  address: string
}

type UpdateReceiverUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    receiver: Receiver
  }
>

@Injectable()
export class UpdateReceiverUseCase {
  constructor(private receiversRepository: ReceiversRepository) {}

  async execute({
    receiverId,
    name,
    email,
    address,
  }: UpdateReceiverUseCaseRequest): Promise<UpdateReceiverUseCaseResponse> {
    const receiver = await this.receiversRepository.findById(receiverId)

    if (!receiver) {
      return left(new ResourceNotFoundError())
    }

    receiver.name = name
    receiver.email = email
    receiver.address = address

    await this.receiversRepository.update(receiver)

    return right({ receiver })
  }
}
