import { Publisher, Subjects, TicketCreatedEvent } from '@yair-tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
