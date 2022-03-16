import { Publisher, Subjects, TicketUpdatedEvent } from '@yair-tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
