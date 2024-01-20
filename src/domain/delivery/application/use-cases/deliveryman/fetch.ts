import { DeliverymansRepository } from '@/domain/delivery/application/repositories/deliverymans-repository'
import { Deliveryman } from '@/domain/delivery/enterprise/entities/deliveryman'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface FetchDeliverymansUseCaseRequest {
  page: number
}

type FetchDeliverymansUseCaseResponse = Either<
  null,
  {
    deliverymans: Deliveryman[] | null
  }
>

@Injectable()
export class FetchDeliverymansUseCase {
  constructor(private deliverymansRepository: DeliverymansRepository) {}

  async execute({
    page,
  }: FetchDeliverymansUseCaseRequest): Promise<FetchDeliverymansUseCaseResponse> {
    const deliverymans = await this.deliverymansRepository.findMany({ page })

    return right({ deliverymans })
  }
}
