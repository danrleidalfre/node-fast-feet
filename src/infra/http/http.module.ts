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
import { CreateReceiverController } from '@/infra/http/controlllers/receiver/create.controller'
import { FetchReceiversController } from '@/infra/http/controlllers/receiver/fetch.controller'
import { GetReceiverByIdController } from '@/infra/http/controlllers/receiver/get.controller'
import { UpdateReceiverController } from '@/infra/http/controlllers/receiver/update.controlller'
import { DeleteReceiverController } from '@/infra/http/controlllers/receiver/delete.controller'
import { CreateReceiverUseCase } from '@/domain/delivery/application/use-cases/receiver/create'
import { FetchReceiversUseCase } from '@/domain/delivery/application/use-cases/receiver/fetch'
import { GetReceiverByIdUseCase } from '@/domain/delivery/application/use-cases/receiver/get'
import { UpdateReceiverUseCase } from '@/domain/delivery/application/use-cases/receiver/update'
import { DeleteReceiverUseCase } from '@/domain/delivery/application/use-cases/receiver/delete'

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
    CreateReceiverController,
    FetchReceiversController,
    GetReceiverByIdController,
    UpdateReceiverController,
    DeleteReceiverController,
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
    CreateReceiverUseCase,
    FetchReceiversUseCase,
    GetReceiverByIdUseCase,
    UpdateReceiverUseCase,
    DeleteReceiverUseCase,
  ],
})
export class HttpModule {}
