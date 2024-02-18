import { DynamoDBUtils } from "./dynamodb/dynamodb-utils";

const tableName = process.env.DYNAMODB_TABLE_NAME;

export class OrderNumberRepository {
  private ddbUtils: DynamoDBUtils;

  constructor() {
    this.ddbUtils = new DynamoDBUtils();
  }


  async getOrderID() {
    const zero=0;
    const response = await this.ddbUtils.updateItem({
      TableName: tableName,
      Key: { StoreID: zero },
      UpdateExpression: "ADD OrderID :inc",
      ExpressionAttributeValues: { ":inc": 1 },
      ReturnValues: "UPDATED_NEW",
    });

    return response.Attributes.OrderID;
  }


  async getOrderNumberWithAtt(orderID: number, storeID: number) {
    const response = await this.ddbUtils.updateItem({
      TableName: tableName,
      Key: { StoreID: storeID },
      UpdateExpression: "SET OrderNumber=if_not_exists(OrderNumber, :init) + :inc, OrderID=:orderId",
      ExpressionAttributeValues: { ":init": 99,
                                    ":inc": 1,
                                   ":orderId": orderID},
      ReturnValues: "ALL_NEW",
    });

    return response.Attributes;
  }

  
}

