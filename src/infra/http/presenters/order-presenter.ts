import { Order } from '@/domain/delivery/enterprise/entities/order'

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      id: order.id.toString(),
      deliverymanId: order.deliverymanId
        ? order.deliverymanId.toString()
        : null,
      receiverId: order.receiverId.toString(),
      address: order.address,
      created_at: order.createdAt,
      available_at: order.availableAt,
      withdrawal_at: order.withdrawalAt,
      delivered_at: order.deliveredAt,
      returned_at: order.returnedAt,
      photo_url: order.photoUrl,
    }
  }
}
