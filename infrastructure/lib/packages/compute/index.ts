import { IFunction, Runtime } from "aws-cdk-lib/aws-lambda"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Construct } from "constructs"
import { join } from "path"

export enum LambdaNames {
  PRODUCTS_ALL = "products/index.ts",
  PRODUCTS_BY_ID = "products/[id].ts"
}

export type TComputeConstructProps = {
  handlerPath: LambdaNames
}

export class ComputeConstruct extends Construct {
  private lambdaFunction: IFunction

  constructor(scope: Construct, id: string, props: TComputeConstructProps) {
    super(scope, id);

    const { handlerPath } = props

    this.lambdaFunction = new NodejsFunction(this, id, {
      runtime: Runtime.NODEJS_16_X,
      entry: join(__dirname, 'lambdas', handlerPath),
    })
  }

  public getLambdaFunction() {
    return this.lambdaFunction
  }
}