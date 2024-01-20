import { Injectable } from '@nestjs/common'
import { DeliverymansRepository } from '@/domain/delivery/application/repositories/deliverymans-repository'
import { Deliveryman } from '@/domain/delivery/enterprise/entities/deliveryman'
import { PrismaDeliverymanMapper } from '@/infra/database/prisma/mappers/prisma-deliveryman-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PaginationParams } from '@/core/repositories/pagination-params'

@Injectable()
export class PrismaDeliverymansRepository implements DeliverymansRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Deliveryman | null> {
    const deliveryman = await this.prisma.deliveryman.findUnique({
      where: {
        id,
      },
    })

    if (!deliveryman) {
      return null
    }

    return PrismaDeliverymanMapper.toDomain(deliveryman)
  }

  async findByCpf(cpf: string): Promise<Deliveryman | null> {
    const deliveryman = await this.prisma.deliveryman.findUnique({
      where: {
        cpf,
      },
    })

    if (!deliveryman) {
      return null
    }

    return PrismaDeliverymanMapper.toDomain(deliveryman)
  }

  async findMany({ page }: PaginationParams): Promise<Deliveryman[]> {
    const questions = await this.prisma.deliveryman.findMany({
      orderBy: {
        name: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(PrismaDeliverymanMapper.toDomain)
  }

  async create(deliveryman: Deliveryman): Promise<void> {
    const data = PrismaDeliverymanMapper.toPrisma(deliveryman)

    await this.prisma.deliveryman.create({
      data,
    })
  }

  async update(deliveryman: Deliveryman): Promise<void> {
    const data = PrismaDeliverymanMapper.toPrisma(deliveryman)

    await this.prisma.deliveryman.update({
      where: {
        id: deliveryman.id.toString(),
      },
      data,
    })
  }

  async delete(deliveryman: Deliveryman): Promise<void> {
    const data = PrismaDeliverymanMapper.toPrisma(deliveryman)

    await this.prisma.deliveryman.delete({
      where: {
        id: data.id,
      },
    })
  }
}
