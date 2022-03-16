import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@yair-tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
