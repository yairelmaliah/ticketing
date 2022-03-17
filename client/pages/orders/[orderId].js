import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/useRequest';

export default function OrderShow({ order, currentUser }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timeId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timeId);
    };
  }, [order]);

  if (timeLeft < 0) return <div>Order Expired !!</div>;
  return (
    <div>
      Time ledt to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51KdkrkFUmTgHDdra1pW5MQOgBQTL70gtPKPKtqUVO4xUfwZNUAYRqneOggfTSfYs5c75G30nmcyQBhoqWJNgUjVz00IsTF6gSG"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
    </div>
  );
}

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;

  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};
