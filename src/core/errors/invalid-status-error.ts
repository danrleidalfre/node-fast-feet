import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidStatusError extends Error implements UseCaseError {
  constructor() {
    super(
      'Invalid status, accepted only: waiting, withdrawal, delivered, returned',
    )
  }
}
