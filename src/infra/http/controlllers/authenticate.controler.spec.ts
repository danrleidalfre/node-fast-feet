import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Authenticate', () => {
  let app: INestApplication
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    await userFactory.makePrismaUser({
      cpf: '47477960029',
      password: await hash('123456', 8),
      role: 'ADMIN',
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      cpf: '474.779.600-29',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
