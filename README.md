# Order Number Generator

## About The Project

This is a sample project to generate Order Numbers for Online Stores 

Some considerations in the solution:
* OrderID must be a global sequential number for all the stores
* StoreID is the ID for each store and is unique
* OrderNumber must be a sequential number by store and have to start at 100
* OrderNumber ad OrderID must be unique
* There can be no holes in the OrderNumbers
* The response time have to be arround 20 ms with 7 req/sec

## Disclaimer
Sequential numbers are not the best solution for these problems and UUID could be better, guaranteeing consistency and having better performance.
The autocannon configuration exceed the requeriment of req/sec but still show good performance. The first execution with autocannon will be slower than subsquent runs due the nature of lambda and dynamodb (coldstart and partitions).


### Built With

* [Serverless Framework](https://serverless.com)
* [AWS Lambda](https://aws.amazon.com/es/pm/lambda)
* [Node 18](https://nodejs.org/en/blog/announcements/v18-release-announce)
* [Typescript](https://www.typescriptlang.org/download)
* [AWS DynamoDB](https://aws.amazon.com/es/pm/dynamodb)
* [DynamoDB Atomic Counters](https://aws.amazon.com/es/blogs/database/implement-resource-counters-with-amazon-dynamodb/)
* [Autocannon](https://www.npmjs.com/package/autocannon)


### Installation

You can install with
  ```sh
  npm install
  npm run install-dynamo-local
  ```

### Run

You can start the project with
  ```sh
  npm run start
  ```

### Test with curl 

You can test the project with (run in another terminal)
```sh
npm run test-curl-command
  ```

or 

```sh
curl --location 'http://localhost:3000/api/generateOrderNumber' \
--header 'Content-Type: application/json' \
--data '{
  "store_id": 32913
}            '
  ```

### Performance Test with autocannon

You can start the performance test with (run in another terminal)
  ```sh
npm run load-testing
  ```


## Contact

Gustavo Ariotti - gustavo.ariotti@gmail.com

Project Link: [https://github.com/gariotti/order-number-generator](https://github.com/gariotti/order-number-generator)


## License

Distributed under the MIT License.