import { Publisher, Subjects, PaymentCreatedEvent } from '@yair-tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
