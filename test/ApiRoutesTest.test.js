import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import SellerTable from '../client/src/components/Seller/SellerTable';
import PropTypes from 'prop-types';

const request = require("supertest")('127.0.0.1:3002');
require("babel-polyfill");
// const app = require("../src/Components/App.js");



Enzyme.configure({ adapter: new Adapter() });

it ('should fetch a created record', async () => {
  const response = await request.get("/overview/1");
  expect(response.statusCode).toBe(200);
});

it ('should return error for a false record', async () => {
  const response = await request.get("/overview/-1");
  console.log('response', response.body);
  expect(response.statusCode).toBe(404);
});

