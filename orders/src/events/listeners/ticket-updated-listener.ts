import { Listener, Subjects, TicketUpdatedEvent } from '@yair-tickets/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../model/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketUpdatedListenr extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) throw new Error('Ticket not found');

    const { title, price } = data;

    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
