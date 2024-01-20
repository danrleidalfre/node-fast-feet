import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { ReceiversRepository } from '@/domain/delivery/application/repositories/receivers-repository'
import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'

interface CreateReceiverUseCaseRequest {
  name: string
  email: string
  address: string
}

type CreateReceiverUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    receiver: Receiver
  }
>

@Injectable()
export class CreateReceiverUseCase {
  constructor(private receiversRepository: ReceiversRepository) {}

  async execute({
    name,
    email,
    address,
  }: CreateReceiverUseCaseRequest): Promise<CreateReceiverUseCaseResponse> {
    const receiverWithSameEmail =
      await this.receiversRepository.findByEmail(email)

    if (receiverWithSameEmail) {
      return left(new ResourceAlreadyExistsError(email))
    }

    const receiver = Receiver.create({
      name,
      email,
      address,
    })

    await this.receiversRepository.create(receiver)

    return right({
      receiver,
    })
  }
}
