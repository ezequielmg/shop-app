import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { randomUUID } from "crypto";
import { TGetByProps, TCreateProps, TGetAllProps, TGetBatchByProps } from './types';

const documentClient = new DocumentClient()

/**
 * Helper DB class
 */
export const DB = {
  /**
   * Return the items by the matching TableName + <id>(Primary key)
   * @param props TGetByIdProps
   * @returns Promise<T>
   */
  async getBy<T>(props: TGetByProps): Promise<T> {
    const { TableName, Key } = props

    const params: DocumentClient.GetItemInput = {
      TableName,
      Key
    }

    const { Item } = await documentClient.get(params).promise()
    return Item as T
  },

  /**
   * Return a batch of items by the matching TableName + Keys
   * @param props TGetBatchByProps
   * @returns Promise<T[] | undefined>
   */
  async getBatchBy<T>(props: TGetBatchByProps): Promise<T[]> {
    const { TableName, Keys } = props

    if (Keys.length === 0) {
      return []
    }

    const params: DocumentClient.BatchGetItemInput = {
      RequestItems: {
        [TableName]: {
          Keys
        }
      }
    }

    const { Responses } = await documentClient.batchGet(params).promise()
    return (Responses ? Responses[TableName] : []) as T[]
  },

  /**
   * Return all the items for the given TableName
   * @param props TGetAllProps
   * @returns Promise<T>
   */
  async getAll<T>(props: TGetAllProps): Promise<T> {
    const { TableName } = props

    const params: DocumentClient.ScanInput = {
      TableName
    }

    const { Items } = await documentClient.scan(params).promise()
    return Items as T
  },

  /**
   * Create a new Item for the table.
   * Note: Assuming the use of String type
   * 
   * @param props TGetAllProps
   * @returns Promise<T>
   */
  async create<T>(props: TCreateProps): Promise<T> {
    const { TableName, data, keyName } = props

    const Item = {
      [keyName]: randomUUID(),
      ...data,
    }

    const params: DocumentClient.PutItemInput = {
      TableName,
      Item
    }

    await documentClient.put(params).promise()
    return Item as T
  },
}
