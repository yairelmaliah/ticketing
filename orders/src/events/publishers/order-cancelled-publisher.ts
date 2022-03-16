import { Publisher, OrderCancelledEvent, Subjects } from '@yair-tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
