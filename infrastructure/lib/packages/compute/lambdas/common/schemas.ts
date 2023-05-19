export type TProduct = {
  id: string,
  title: string,
  price: string,
  description: string
}

export type TStock = {
  product_id: string,
  count: number
}

export type TProductStock = Array<TProduct & Pick<TStock, 'count'>>