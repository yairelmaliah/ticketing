import Router from 'next/router';
import React, { useState } from 'react';
import useRequest from '../../hooks/useRequest';

export default function newTicket() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: { title, price },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = e => {
    e.preventDefault();
    doRequest();
  };

  const onBlur = e => {
    const value = parseFloat(price);
    if (isNaN(value)) return;
    setPrice(value.toFixed(2));
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type={'number'}
            value={price}
            onBlur={onBlur}
            onChange={e => setPrice(e.target.value)}
            className="form-control"
          />
        </div>
        {errors}
        <button className="btn my-2 btn-primary">Submit</button>
      </form>
    </div>
  );
}
