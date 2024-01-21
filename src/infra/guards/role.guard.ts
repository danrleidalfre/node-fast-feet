import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UsersRepository } from '@/domain/delivery/application/repositories/users-repository'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersRepository: UsersRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<string>('role', context.getHandler())
    const request = context.switchToHttp().getRequest()

    if (request?.user) {
      const id = request.user.sub
      const user = await this.usersRepository.findById(id)

      if (!user) {
        return false
      }

      return Array.isArray(role) ? role.includes(user.role) : user.role === role
    }

    return false
  }
}
