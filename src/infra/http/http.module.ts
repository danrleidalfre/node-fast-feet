import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { AuthenticateController } from '@/infra/http/controlllers/authenticate.controller'
import { AuthenticateUseCase } from '@/domain/delivery/enterprise/entities/authenticate'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AuthenticateController],
  providers: [AuthenticateUseCase],
})
export class HttpModule {}
