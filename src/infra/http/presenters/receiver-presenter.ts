import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'

export class ReceiverPresenter {
  static toHTTP(receiver: Receiver) {
    return {
      id: receiver.id.toString(),
      name: receiver.name,
      email: receiver.email,
    }
  }
}
