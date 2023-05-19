import { IFunction, Runtime } from "aws-cdk-lib/aws-lambda"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Construct } from "constructs"
import { join } from "path"
import { TTables } from "../persistance"

export enum LambdaNames {
  PRODUCTS_GET_ALL = "products/all.ts",
  PRODUCTS_GET_BY_ID = "products/get-by-id.ts",
  PRODUCTS_CREATE = "products/create.ts",
}

export type TComputeConstructProps = {
  handlerPath: LambdaNames,
  tables: TTables
}

export class ComputeConstruct extends Construct {
  private lambdaFunction: IFunction

  constructor(scope: Construct, id: string, props: TComputeConstructProps) {
    super(scope, id);

    const {
      handlerPath,
      tables: {
        posts: postsTable,
        stocks: stocksTable
      }
    } = props

    this.lambdaFunction = new NodejsFunction(this, id, {
      runtime: Runtime.NODEJS_16_X,
      entry: join(__dirname, 'lambdas', handlerPath),
      environment: {
        POSTS_TABLE_NAME: postsTable.tableName,
        STOCKS_TABLE_NAME: stocksTable.tableName,
      },
    })

    postsTable.grantReadWriteData(this.lambdaFunction);
    stocksTable.grantReadWriteData(this.lambdaFunction);
  }

  public getLambdaFunction() {
    return this.lambdaFunction
  }
}