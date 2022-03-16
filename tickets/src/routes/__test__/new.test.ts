import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('has a route handler listenning to /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  const response = await request(app).post('/api/tickets').send({}).expect(401);
});

it('returns status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provides', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it('returns an error if an invalid price is provides', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: 'asdsadsadas',
      price: -10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: 'asdsadsadas',
    })
    .expect(400);
});

it('creates a ticket with valid inputs', async () => {
  // add in a check to make sure that ticket was saved
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: 'sadasdas',
      price: 20,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});

it('publish an event', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: 'sadasdas',
      price: 20,
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
