import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import {BrowserRouter} from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51MxVnNLP3LunU4amxbouTQhUAcdsu0TO6RHB2Rr3CpEgTLA3xnXdh9FsKhMM3VcUY0SueAh7N3kihuw1LuNzEwyM00ISdLOowM');


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </BrowserRouter>
);

