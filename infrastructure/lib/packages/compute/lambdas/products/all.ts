import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { DB } from "../common/DB";
import { response } from "../common/response";
import { TProduct, TProductStock, TStock } from "../common/schemas";



export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {

  // All products retrieved
  const products = await DB.getAll<TProduct[]>({
    TableName: process.env.POSTS_TABLE_NAME as string
  })

  // Mapping an object to send to batch query
  const stockedProducts: TProductStock = []
  const stockKeys = products.map(({id}) => ({
    product_id: id
  }))

  const stocks = await DB.getBatchBy<TStock>({
    TableName: process.env.STOCKS_TABLE_NAME as string,
    Keys: stockKeys
  })

  // Then merging results that matches based on the response
  products.forEach(product => {
    const stock = stocks.find(({product_id}) => product.id === product_id)

    stockedProducts.push({
      ...product,
      count: stock?.count || 0
    })
  })

  return response(stockedProducts)
};