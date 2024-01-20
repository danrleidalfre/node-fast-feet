import { Injectable } from '@nestjs/common'
import { ReceiversRepository } from '@/domain/delivery/application/repositories/receivers-repository'
import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'
import { PrismaReceiverMapper } from '@/infra/database/prisma/mappers/prisma-receiver-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PaginationParams } from '@/core/repositories/pagination-params'

@Injectable()
export class PrismaReceiversRepository implements ReceiversRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Receiver | null> {
    const receiver = await this.prisma.receiver.findUnique({
      where: {
        id,
      },
    })

    if (!receiver) {
      return null
    }

    return PrismaReceiverMapper.toDomain(receiver)
  }

  async findByEmail(email: string): Promise<Receiver | null> {
    const receiver = await this.prisma.receiver.findUnique({
      where: {
        email,
      },
    })

    if (!receiver) {
      return null
    }

    return PrismaReceiverMapper.toDomain(receiver)
  }

  async findMany({ page }: PaginationParams): Promise<Receiver[]> {
    const questions = await this.prisma.receiver.findMany({
      orderBy: {
        name: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(PrismaReceiverMapper.toDomain)
  }

  async create(receiver: Receiver): Promise<void> {
    const data = PrismaReceiverMapper.toPrisma(receiver)

    await this.prisma.receiver.create({
      data,
    })
  }

  async update(receiver: Receiver): Promise<void> {
    const data = PrismaReceiverMapper.toPrisma(receiver)

    await this.prisma.receiver.update({
      where: {
        id: receiver.id.toString(),
      },
      data,
    })
  }

  async delete(receiver: Receiver): Promise<void> {
    const data = PrismaReceiverMapper.toPrisma(receiver)

    await this.prisma.receiver.delete({
      where: {
        id: data.id,
      },
    })
  }
}
