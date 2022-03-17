import Router from 'next/router';
import React from 'react';
import useRequest from '../../hooks/useRequest';

export default function TicketShow({ ticket }) {
  const { doRequest, errors } = useRequest({
    url: `/api/orders`,
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: order => Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors}
      <button onClick={e => doRequest()} className="btn btn-primary">
        Purchase
      </button>
    </div>
  );
}

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};
