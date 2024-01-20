import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { AuthenticateController } from '@/infra/http/controlllers/authenticate.controller'
import { AuthenticateUseCase } from '@/domain/delivery/application/use-cases/authenticate'
import { CreateUserController } from '@/infra/http/controlllers/user/create.controller'
import { CreateUserUseCase } from '@/domain/delivery/application/use-cases/user/create'
import { DeleteUserController } from '@/infra/http/controlllers/user/delete.controller'
import { DeleteUserUseCase } from '@/domain/delivery/application/use-cases/user/delete'
import { CreateDeliverymanController } from '@/infra/http/controlllers/deliveryman/create.controller'
import { CreateDeliverymanUseCase } from '@/domain/delivery/application/use-cases/deliveryman/create'
import { FetchDeliverymansController } from '@/infra/http/controlllers/deliveryman/fetch.controller'
import { FetchDeliverymansUseCase } from '@/domain/delivery/application/use-cases/deliveryman/fetch'
import { GetDeliverymanByIdController } from '@/infra/http/controlllers/deliveryman/get.controller'
import { GetDeliverymanByIdUseCase } from '@/domain/delivery/application/use-cases/deliveryman/get'
import { UpdateDeliverymanController } from '@/infra/http/controlllers/deliveryman/update.controlller'
import { UpdateDeliverymanUseCase } from '@/domain/delivery/application/use-cases/deliveryman/update'
import { DeleteDeliverymanController } from '@/infra/http/controlllers/deliveryman/delete.controller'
import { DeleteDeliverymanUseCase } from '@/domain/delivery/application/use-cases/deliveryman/delete'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    CreateUserController,
    DeleteUserController,
    CreateDeliverymanController,
    FetchDeliverymansController,
    GetDeliverymanByIdController,
    UpdateDeliverymanController,
    DeleteDeliverymanController,
  ],
  providers: [
    AuthenticateUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    CreateDeliverymanUseCase,
    FetchDeliverymansUseCase,
    GetDeliverymanByIdUseCase,
    UpdateDeliverymanUseCase,
    DeleteDeliverymanUseCase,
  ],
})
export class HttpModule {}
