import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { DeliverymansRepository } from '@/domain/delivery/application/repositories/deliverymans-repository'
import { Deliveryman } from '@/domain/delivery/enterprise/entities/deliveryman'
import CPF from 'cpf-check'
import { UsersRepository } from '@/domain/delivery/application/repositories/users-repository'
import { User } from '@/domain/delivery/enterprise/entities/user'
import { HashGenerator } from '@/domain/delivery/application/cryptography/hash-generator'

interface CreateDeliverymanUseCaseRequest {
  name: string
  cpf: string
  email: string
}

type CreateDeliverymanUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    deliveryman: Deliveryman
  }
>

@Injectable()
export class CreateDeliverymanUseCase {
  constructor(
    private deliverymansRepository: DeliverymansRepository,
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    cpf,
    email,
  }: CreateDeliverymanUseCaseRequest): Promise<CreateDeliverymanUseCaseResponse> {
    const stripedCpf = CPF.strip(cpf)

    const dmWithSameCpf =
      await this.deliverymansRepository.findByCpf(stripedCpf)

    if (dmWithSameCpf) {
      return left(new ResourceAlreadyExistsError(cpf))
    }

    const userWithSameCpf = await this.usersRepository.findByCpf(stripedCpf)

    if (userWithSameCpf) {
      return left(new ResourceAlreadyExistsError(cpf))
    }

    const hashedPassword = await this.hashGenerator.hash(email)

    const user = User.create({
      cpf: stripedCpf,
      password: hashedPassword,
    })

    await this.usersRepository.create(user)

    const deliveryman = Deliveryman.create({
      userId: user.id,
      name,
      cpf: stripedCpf,
      email,
    })

    await this.deliverymansRepository.create(deliveryman)

    return right({
      deliveryman,
    })
  }
}
