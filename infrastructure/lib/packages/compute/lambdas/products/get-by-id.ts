import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { DB } from "../common/DB";
import { response } from "../common/response";
import { TProduct } from "../common/schemas";

type THandlerEvent = APIGatewayEvent & {
  pathParameters: {
    id: string
  }
}

export const handler = async (
  event: THandlerEvent
): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters

  const product = await DB.getBy<TProduct>({
    TableName: process.env.POSTS_TABLE_NAME as string,
    Key: {
      id
    }
  })

  if (!product) {
    return response({
      message: "Product not found",
    }, 404)
  }

  return response(product)
};