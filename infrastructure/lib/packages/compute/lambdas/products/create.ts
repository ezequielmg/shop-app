import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { DB } from "../common/DB";
import { response } from "../common/response";
import { TProduct } from "../common/schemas";

type THandlerEvent = APIGatewayEvent & {
  body: Omit<TProduct, 'id'>
}

export const handler = async (
  event: THandlerEvent
): Promise<APIGatewayProxyResult> => {
  const data = JSON.parse(event.body)

  const product = await DB.create<TProduct>({
    TableName: process.env.POSTS_TABLE_NAME as string,
    data,
    keyName: 'id'
  })

  if (!product) {
    return response({
      message: "Product could not be created",
    }, 404)
  }

  return response(product)
};