import { ReceiversRepository } from '@/domain/delivery/application/repositories/receivers-repository'
import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface FetchReceiversUseCaseRequest {
  page: number
}

type FetchReceiversUseCaseResponse = Either<
  null,
  {
    receivers: Receiver[] | null
  }
>

@Injectable()
export class FetchReceiversUseCase {
  constructor(private receiversRepository: ReceiversRepository) {}

  async execute({
    page,
  }: FetchReceiversUseCaseRequest): Promise<FetchReceiversUseCaseResponse> {
    const receivers = await this.receiversRepository.findMany({ page })

    return right({ receivers })
  }
}
