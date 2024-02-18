import {DynamoDBClient, QueryCommandInput, DescribeTableCommand} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand,
  QueryCommand,
  PutCommandInput,
  GetCommandInput,
  UpdateCommandInput,
  DeleteCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { handleError } from '../../utils/error-handler';


export class DynamoDBUtils {
  
  ddbDocClient: DynamoDBDocumentClient;
  
  constructor() {

    const client = new DynamoDBClient({
      region: process.env.DYNAMODB_REGION || '',
      endpoint: process.env.DYNAMODB_ENDPOINT || '',
      credentials: {
        accessKeyId: process.env.DYNAMODB_ACCESSKEY || '',
        secretAccessKey: process.env.DYNAMODB_SECRET || '',
      },
    })
    const docClient = DynamoDBDocumentClient.from(client);

    this.ddbDocClient = docClient;  }

  async putItem(params: PutCommandInput) {
    try {
      const response = await this.ddbDocClient.send(new PutCommand(params));
      return response;
    } catch (error) {
      return handleError('put_item_error', error as Error);
    }
  }

  async getItem(params: GetCommandInput) {
    try {
      const response = await this.ddbDocClient.send(new GetCommand(params));
      return response;
    } catch (error) {
      return handleError('get_item_error', error as Error);
    }
  }

  async updateItem(params: UpdateCommandInput) {
    try {
      console.log(params);
      const response = await this.ddbDocClient.send(new UpdateCommand(params));
      return response;
    } catch (error) {
      return handleError('update_item_error', error as Error);
    }
  }

  async deleteItem(params: DeleteCommandInput) {
    try {
      const response = await this.ddbDocClient.send(new DeleteCommand(params));
      return response;
    } catch (error) {
      return handleError('delete_item_error', error as Error);
    }
  }

  async queryItems(params: QueryCommandInput) {
    try {
      const response = await this.ddbDocClient.send(new QueryCommand(params));
      return response;
    } catch (error) {
      return handleError('query_items_error', error as Error);
    }
  }

  async describeTable(params: any) {
    try {
      const response = await this.ddbDocClient.send(new DescribeTableCommand(params));
      return response;
    } catch (error) {
      return handleError('describe_table_error', error as Error);
    }
  }

}


