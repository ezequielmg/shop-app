import {
  IAuthorizer,
  IdentitySource,
  TokenAuthorizer,
} from "aws-cdk-lib/aws-apigateway";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "path";
import { Duration } from "aws-cdk-lib";

export class AuthorizationConstruct extends Construct {
  public readonly authorizer: IAuthorizer;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Lambda Authorizer
    const handler = new NodejsFunction(this, "authorizerHandler", {
      runtime: Runtime.NODEJS_16_X,
      entry: join(__dirname, "../compute/lambdas/authorizers", "custom.ts"),
    });

    // Authorizer (Token)
    this.authorizer = new TokenAuthorizer(this, "authorizerRequest", {
      handler,
      identitySource: IdentitySource.header("Authorization"),
      resultsCacheTtl: Duration.seconds(0),
    });
  }
}
