import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '10s',
      preAllocatedVUs: 500, // how large the initial pool of VUs would be
      maxVUs: 500, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default function () {


  // http.get(`http://localhost:5984/overview/9400038`);
  // http.get(`http://localhost:5984/overview/9400051`);




  var url = 'http://localhost:5984/overview';
  var payload = {
    "id": "426dd39f-dae2-11eb-b9e7-c3a86b9617fb",
    "list_price": 99,
    "price": 11,
    "prime": "true",
    "sold_by": "Amazon.com",
    "ships_from": "Amazon.com",
    "product_id": 203940,
    "package_name": "Wooden",
    "product_name": "Tasty Steel Hat",
    "in_stock": "true",
    "inventory": 2774,
    "sellers": [
      {
        "id": "426dd3a3-dae2-11eb-b9e7-c3a86b9617fb",
        "discs": 28,
        "price": 28,
        "newfrom": "25",
        "usedfrom": "20",
        "edition": "Special Extended Version",
        "form": "4K",
        "release_date": "2021-02-22T21:30:15.718Z"
      },
      {
        "id": "426dd3a1-dae2-11eb-b9e7-c3a86b9617fb",
        "discs": 14,
        "price": 16,
        "newfrom": "15",
        "usedfrom": "11",
        "edition": "Collector's Edition",
        "form": "Blu-ray",
        "release_date": "2021-06-15T01:48:29.295Z"
      },
      {
        "id": "426dd3a4-dae2-11eb-b9e7-c3a86b9617fb",
        "discs": 2,
        "price": 6,
        "newfrom": "6",
        "usedfrom": "4",
        "edition": "Special Edition",
        "form": "DVD",
        "release_date": "2021-01-29T07:11:45.479Z"
      },
      {
        "id": "426dd3a0-dae2-11eb-b9e7-c3a86b9617fb",
        "discs": 37,
        "price": 34,
        "newfrom": "31",
        "usedfrom": "25",
        "edition": "Limited Edition",
        "form": "4K",
        "release_date": "2020-07-28T04:48:14.956Z"
      },
      {
        "id": "426dd3a2-dae2-11eb-b9e7-c3a86b9617fb",
        "discs": 8,
        "price": 11,
        "newfrom": "10",
        "usedfrom": "7",
        "edition": "Special Edition",
        "form": "DVD",
        "release_date": "2020-10-23T19:06:20.526Z"
      }
    ],
    "forms": [
      {
        "id": "426dd3a5-dae2-11eb-b9e7-c3a86b9617fb",
        "price": 8,
        "form": "DVD",
        "id_products_foreign": "426dd39f-dae2-11eb-b9e7-c3a86b9617fb",
        "product_id": 203939
      },
      {
        "id": "426dd3a6-dae2-11eb-b9e7-c3a86b9617fb",
        "price": 20,
        "form": "Blu-ray",
        "id_products_foreign": "426dd39f-dae2-11eb-b9e7-c3a86b9617fb",
        "product_id": 203939
      },
      {
        "id": "426dd3a7-dae2-11eb-b9e7-c3a86b9617fb",
        "price": 37,
        "form": "4K",
        "id_products_foreign": "426dd39f-dae2-11eb-b9e7-c3a86b9617fb",
        "product_id": 203939
      },
      {
        "id": "426dd3a8-dae2-11eb-b9e7-c3a86b9617fb",
        "price": 38,
        "form": "Prime Video",
        "id_products_foreign": "426dd39f-dae2-11eb-b9e7-c3a86b9617fb",
        "product_id": 203939
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
