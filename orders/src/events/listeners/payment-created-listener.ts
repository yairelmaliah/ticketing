import {
  Listener,
  Subjects,
  PaymentCreatedEvent,
  OrderStatus,
} from '@yair-tickets/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../model/order';
import { queueGroupName } from './queue-group-name';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) throw new Error('Order not found');

    order.set({ status: OrderStatus.Complete });

    await order.save();

    msg.ack();
  }
}
