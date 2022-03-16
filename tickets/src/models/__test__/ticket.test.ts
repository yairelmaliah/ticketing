import { Ticket } from '../ticket';

it('implements optimistic cuncurrency control', async () => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  // Save the ticket to DB
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // Make two seperate changes to the tickets we fetched
  firstInstance?.set({ price: 10 });
  secondInstance?.set({ price: 15 });

  // Save the first fetched ticket
  await firstInstance?.save();

  // Save the second fetched ticket and expect an error
  try {
    await secondInstance?.save();
  } catch (error) {}

  return new Error('Should not reach this poibnt');
});

it('increments the version number on multiple saves', async () => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  // Save the ticket to DB multiple times
  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
