import {
  Cors,
  LambdaIntegration,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { HttpMethod } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { ComputeConstruct, LambdaNames } from "../compute";

export class GatewayConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // -> API
    const api = new RestApi(this, 'restApi', {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS
      },
      deployOptions: {
        stageName: 'dev'
      }
    })

    // /products
    const products = api.root.addResource("products");
    products.addMethod(HttpMethod.GET, new LambdaIntegration(
      new ComputeConstruct(this, 'productsAll', {
        handlerPath: LambdaNames.PRODUCTS_ALL
      }).getLambdaFunction()
    ));

    // /products/{id}
    const product = products.addResource("{id}");
    product.addMethod(HttpMethod.GET, new LambdaIntegration(
      new ComputeConstruct(this, 'productsById', {
        handlerPath: LambdaNames.PRODUCTS_BY_ID
      }).getLambdaFunction()
    ));
  }
}
