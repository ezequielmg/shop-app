export type TGetByProps = {
  TableName: string,
  Key: Record<string, string>
}

export type TGetBatchByProps = {
  TableName: string,
  Keys: Record<string, string>[]
}

export type TGetAllProps = {
  TableName: string
}

export type TCreateProps = {
  TableName: string,
  keyName: string,
  data: Record<string, string>,
}