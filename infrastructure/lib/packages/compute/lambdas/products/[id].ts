import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { products } from "./_mocks";

type THandlerEvent = APIGatewayEvent & {
  pathParameters: {
    id: string
  }
}

export const handler = async (
  event: THandlerEvent
): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters
  let [body, statusCode] = ['', 200]

  const product = products.find(product => product.id === id)

  if (product) {
    body = JSON.stringify(product)
  } else {
    body = 'The product does not exists'
    statusCode = 404
  }

  return {
    body,
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
};