import {
  AuthorizationType,
  Cors,
  IAuthorizer,
  LambdaIntegration,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { HttpMethod } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { ComputeConstruct, LambdaNames } from "../compute";
import { TTables } from "../persistance";

type TGatewayConstructProps = {
  tables: TTables,
  authorizer: IAuthorizer
}

export class GatewayConstruct extends Construct {
  constructor(scope: Construct, id: string, props: TGatewayConstructProps) {
    super(scope, id);

    const { tables, authorizer } = props

    // -> API
    const api = new RestApi(this, 'restApi', {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS
      },
      deployOptions: {
        stageName: 'dev'
      },
      defaultMethodOptions: {
        authorizer,
        authorizationType: AuthorizationType.CUSTOM
      },
    })

    // /products
    const products = api.root.addResource("products");
      // GET
    products.addMethod(HttpMethod.GET, new LambdaIntegration(
      new ComputeConstruct(this, 'productsAll', {
        handlerPath: LambdaNames.PRODUCTS_GET_ALL,
        tables
      }).getLambdaFunction()
    ));
      // POST
    products.addMethod(HttpMethod.POST, new LambdaIntegration(
      new ComputeConstruct(this, 'productsCreate', {
        handlerPath: LambdaNames.PRODUCTS_CREATE,
        tables
      }).getLambdaFunction()
    ));


    // /products/{id}
    const product = products.addResource("{id}");
      // GET
    product.addMethod(HttpMethod.GET, new LambdaIntegration(
      new ComputeConstruct(this, 'productsGetById', {
        handlerPath: LambdaNames.PRODUCTS_GET_BY_ID,
        tables
      }).getLambdaFunction()
    ));
  }
}
