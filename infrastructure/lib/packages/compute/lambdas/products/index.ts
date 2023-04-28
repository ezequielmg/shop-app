import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { products } from "./_mocks";

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {

  return {
    body: JSON.stringify(products),
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
};