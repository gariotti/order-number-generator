import type {
  Context,
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
  Handler,
} from "aws-lambda";

import { OrderNumberRepository } from "./repository/order-number-repository";

const orderNumberRepository = new OrderNumberRepository();

export const handler: Handler = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
  try {
    const storeID = JSON.parse(_event.body!).store_id;

    if (typeof storeID === "number" && storeID > 0) {      
      
      const orderID = await orderNumberRepository.getOrderID();
      const attOrderNumber = await orderNumberRepository.getOrderNumberWithAtt(
        orderID,
        storeID
      );

      return {
        statusCode: 200,
        body: JSON.stringify(attOrderNumber),
      };

    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Malformed Request" }),
      };
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
