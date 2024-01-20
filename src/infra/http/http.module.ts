import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { AuthenticateController } from '@/infra/http/controlllers/authenticate.controller'
import { AuthenticateUseCase } from '@/domain/delivery/application/use-cases/authenticate'
import { CreateUserController } from '@/infra/http/controlllers/create-user.controller'
import { CreateUserUseCase } from '@/domain/delivery/application/use-cases/create-user'
import { DeleteUserController } from '@/infra/http/controlllers/delete-user.controller'
import { DeleteUserUseCase } from '@/domain/delivery/application/use-cases/delete-user'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    CreateUserController,
    DeleteUserController,
  ],
  providers: [AuthenticateUseCase, CreateUserUseCase, DeleteUserUseCase],
})
export class HttpModule {}
