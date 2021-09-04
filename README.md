# Application Mailto

> Item Page 

## Related Repos

  - https://github.com/Zheng-Yi-Sao/ProductGallery
  - https://github.com/Zheng-Yi-Sao/ProductInformation
  - https://github.com/Zheng-Yi-Sao/CustomerReviews

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

* API Routes for http://localhost:3002

* GET /overview/productID

* POST <{{
    "price": {
        "list_price": 26,
        "price": 24
    },
    "shipping": {
        "prime": false,
        "sold_by": "Ebert and Sons",
        "ships_from": "Ebert and Sons"
    },
    "inventory": {
        "in_stock": true,
        "inventory": 10318
    },
    "_id": "60d4e76f4d739eb583da55a8",
    "product_id": "1",
    "form": [
        {
            "_id": "60d4e76fcb1f21baea515e79",
            "price": 36,
            "form": "DVD"
        },
        {
            "_id": "60d4e76fcb1f21baea515e7a",
            "price": 19,
            "form": "Blu-ray"
        },
        {
            "_id": "60d4e76fcb1f21baea515e7b",
            "price": 17,
            "form": "4K"
        },
        {
            "_id": "60d4e76fcb1f21baea515e7c",
            "price": 22,
            "form": "Prime Video"
        }
    ],
    "other_sellers": [
        {
            "_id": "60d4e76fcb1f21baea515e7d",
            "seller_id": "a7a504f0-d528-11eb-aaed-8b06c1f98401",
            "discs": 37,
            "price": 37,
            "newfrom": 35,
            "usedfrom": 29,
            "edition": "Limited Collector's Edition",
            "form": "Blu-ray",
            "release_date": "2021-01-12T13:01:09.309Z"
        },
        {
            "_id": "60d4e76fcb1f21baea515e7e",
            "seller_id": "a7a55310-d528-11eb-aaed-8b06c1f98401",
            "discs": 15,
            "price": 23,
            "newfrom": 31,
            "usedfrom": 4,
            "edition": "Limited Collector's Edition",
            "form": "DVD",
            "release_date": "2020-12-08T02:39:00.347Z"
        },
        {
            "_id": "60d4e76fcb1f21baea515e7f",
            "seller_id": "a7a55311-d528-11eb-aaed-8b06c1f98401",
            "discs": 15,
            "price": 24,
            "newfrom": 26,
            "usedfrom": 10,
            "edition": "Special Extended Version",
            "form": "4K",
            "release_date": "2021-04-21T13:35:45.945Z"
        },
        {
            "_id": "60d4e76fcb1f21baea515e80",
            "seller_id": "a7a55312-d528-11eb-aaed-8b06c1f98401",
            "discs": 33,
            "price": 24,
            "newfrom": 25,
            "usedfrom": 10,
            "edition": "Limited Edition",
            "form": "DVD",
            "release_date": "2021-05-01T04:40:13.560Z"
        },
        {
            "_id": "60d4e76fcb1f21baea515e81",
            "seller_id": "a7a55313-d528-11eb-aaed-8b06c1f98401",
            "discs": 3,
            "price": 10,
            "newfrom": 35,
            "usedfrom": 28,
            "edition": "Collector's Edition",
            "form": "Prime Video",
            "release_date": "2020-12-20T03:26:13.089Z"
        },
        {
            "_id": "60d4e76fcb1f21baea515e82",
            "seller_id": "a7a55314-d528-11eb-aaed-8b06c1f98401",
            "discs": 44,
            "price": 41,
            "newfrom": 15,
            "usedfrom": 10,
            "edition": "Special Extended Version",
            "form": "Blu-ray",
            "release_date": "2021-05-14T05:50:38.214Z"
        },
        {
            "_id": "60d4e76fcb1f21baea515e83",
            "seller_id": "a7a55315-d528-11eb-aaed-8b06c1f98401",
            "discs": 38,
            "price": 28,
            "newfrom": 24,
            "usedfrom": 4,
            "edition": "Special Edition",
            "form": "DVD",
            "release_date": "2021-05-16T17:41:17.851Z"
        },
        {
            "_id": "60d4e76fcb1f21baea515e84",
            "seller_id": "a7a55316-d528-11eb-aaed-8b06c1f98401",
            "discs": 30,
            "price": 21,
            "newfrom": 30,
            "usedfrom": 13,
            "edition": "Special Edition",
            "form": "Prime Video",
            "release_date": "2020-09-26T10:58:26.473Z"
        },
        {
            "_id": "60d4e76fcb1f21baea515e85",
            "seller_id": "a7a55317-d528-11eb-aaed-8b06c1f98401",
            "discs": 29,
            "price": 19,
            "newfrom": 28,
            "usedfrom": 24,
            "edition": "Special Edition",
            "form": "DVD",
            "release_date": "2020-08-10T19:16:40.690Z"
        },
        {
            "_id": "60d4e76fcb1f21baea515e86",
            "seller_id": "a7a55318-d528-11eb-aaed-8b06c1f98401",
            "discs": 40,
            "price": 23,
            "newfrom": 17,
            "usedfrom": 17,
            "edition": "Special Extended Version",
            "form": "DVD",
            "release_date": "2021-06-13T07:21:33.551Z"
        }
    ],
    "package_name": "Rubber",
    "product_name": "Gorgeous Frozen Bacon"
}}> /overview

* PUT <{column: value}> /overview/products/:productID
* PUT <{column: value}> /overview/forms/:productID
* PUT <{column: value}> /overview/other_sellers/:productID

* DELETE /overview/productID

> Some usage instructions

## Seeding Postgres Database

* First run database/postgres.sql

* Second run database/postgresSeed.js (this will create module.export arrays) will create csv files in the main directory of each of the tables (products, other_sellers, products_other_sellers_table_data, and forms


* 3 run postgresInsert to insert the csv file data into postgres database (must go in order of products, sellers, forms, product_and_seller_data) because of foreign key constraints

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

