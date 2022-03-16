import { natsWrapper } from '../../../nats-wrapper';
import { TicketUpdatedListenr } from '../ticket-updated-listener';
import { TicketUpdatedEvent } from '@yair-tickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../model/ticket';

const setup = async () => {
  // Create a Listener
  const listener = new TicketUpdatedListenr(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });

  await ticket.save();

  // Create a fake data event
  const data: TicketUpdatedEvent['data'] = {
    version: ticket.version + 1,
    id: ticket.id,
    title: 'new concert',
    price: 999,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // Create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // Return all this stuff
  return { listener, ticket, data, msg };
};
it('finds, updates, and saves a ticket', async () => {
  const { listener, data, ticket, msg } = await setup();

  // call the onMessage with the data object + message object
  await listener.onMessage(data, msg);

  // Write asserion to make sure a ticket was created
  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket?.title).toEqual(data.title);
  expect(updatedTicket?.price).toEqual(data.price);
  expect(updatedTicket?.version).toEqual(data.version);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();
  // call the onMessage with the data object + message object
  await listener.onMessage(data, msg);
  // Write asserion to make sure ack function is called
  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event is out of order', async () => {
  const { msg, data, listener } = await setup();

  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (error) {}

  expect(msg.ack).not.toHaveBeenCalled();
});
