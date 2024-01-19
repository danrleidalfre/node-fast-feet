import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import CPF from 'cpf-check'

const prisma = new PrismaClient()

async function main() {
  const cpf = CPF.strip('474.779.600-29')
  const password = await hash('123456', 8)

  await prisma.user.create({
    data: {
      cpf,
      password,
      role: 'ADMIN',
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
