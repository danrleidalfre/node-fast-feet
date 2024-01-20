import { UseCaseError } from '@/core/errors/use-case-error'

export class CpfInvalidError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`CPF: "${identifier}" is invalid.`)
  }
}
