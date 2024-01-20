import { User } from '@/domain/delivery/enterprise/entities/user'

export abstract class UsersRepository {
  abstract findByCpf(cpf: string): Promise<User | null>

  abstract create(user: User): Promise<void>

  abstract delete(user: User): Promise<void>
}
