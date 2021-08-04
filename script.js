import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '10s',
      preAllocatedVUs: 200, // how large the initial pool of VUs would be
      maxVUs: 200, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default function () {


  // http.get(`http://localhost:5984/overview/9400038`);
  http.get(`http://localhost:5984/overview/182833`);




  var url = 'http://localhost:5984/overview';
  var payload = {
    "id": "2f299610-f552-11eb-9db1-0db99e7593a0",
    "list_price": 12,
    "price": 11,
    "prime": "true",
    "sold_by": "Buckridge - Wiegand",
    "ships_from": "Buckridge - Wiegand",
    "product_id": 283832,
    "package_name": "Wooden",
    "product_name": "Refined Fresh Fish",
    "in_stock": "true",
    "inventory": 2680,
    "sellers": [
        {
            "id": "2f299611-f552-11eb-9db1-0db99e7593a0",
            "product_id": 283832,
            "discs": 4,
            "price": 8,
            "newfrom": "8",
            "usedfrom": "5",
            "edition": "Special Edition",
            "form": "DVD",
            "release_date": "2021-04-21T06:48:10.507Z"
        },
        {
            "id": "2f299612-f552-11eb-9db1-0db99e7593a0",
            "product_id": 283832,
            "discs": 27,
            "price": 27,
            "newfrom": "24",
            "usedfrom": "19",
            "edition": "Special Extended Version",
            "form": "4K",
            "release_date": "2021-06-20T08:40:37.429Z"
        },
        {
            "id": "2f299613-f552-11eb-9db1-0db99e7593a0",
            "product_id": 283832,
            "discs": 21,
            "price": 22,
            "newfrom": "20",
            "usedfrom": "15",
            "edition": "Limited Collector's Edition",
            "form": "Blu-ray",
            "release_date": "2021-07-04T13:03:13.897Z"
        },
        {
            "id": "2f299614-f552-11eb-9db1-0db99e7593a0",
            "product_id": 283832,
            "discs": 10,
            "price": 13,
            "newfrom": "12",
            "usedfrom": "9",
            "edition": "Collector's Edition",
            "form": "DVD",
            "release_date": "2020-08-26T22:37:37.388Z"
        }
    ],
    "forms": [
        {
            "id": "2f299615-f552-11eb-9db1-0db99e7593a0",
            "price": 32,
            "form": "DVD",
            "product_id": 283832
        },
        {
            "id": "2f299616-f552-11eb-9db1-0db99e7593a0",
            "price": 11,
            "form": "Blu-ray",
            "product_id": 283832
        },
        {
            "id": "2f299617-f552-11eb-9db1-0db99e7593a0",
            "price": 16,
            "form": "4K",
            "product_id": 283832
        },
        {
            "id": "2f299618-f552-11eb-9db1-0db99e7593a0",
            "price": 42,
            "form": "Prime Video",
            "product_id": 283832
        }
    ]
};

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, JSON.stringify(payload), params);

}
