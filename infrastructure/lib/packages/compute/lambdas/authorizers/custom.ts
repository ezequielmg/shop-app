import {
  APIGatewayAuthorizerWithContextResult,
  APIGatewayTokenAuthorizerEvent,
  PolicyDocument,
} from "aws-lambda";

type TAuthorizerContext = {
  id: number | null;
};

const getAuthorizePolicy = (
  allow: boolean,
  Resource: string
): PolicyDocument => {
  return {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: allow ? "Allow" : "Deny",
        Resource,
      },
    ],
  };
};

export const handler = async (
  event: APIGatewayTokenAuthorizerEvent,
): Promise<APIGatewayAuthorizerWithContextResult<TAuthorizerContext>> => {
  let policyDocument: PolicyDocument;
  const context: TAuthorizerContext = {
    id: null,
  };

  // Closure to construct the policy based on the resource(ARN)
  const getPolicy = (allow: boolean): PolicyDocument => {
    return getAuthorizePolicy(allow, event.methodArn);
  };

  if (event.authorizationToken === "bypass") {
    context.id = 123456; // Placeholder, but it can be retrieved from DB or token itself
    policyDocument = getPolicy(true);
  } else {
    policyDocument = getPolicy(false);
  }

  const response: APIGatewayAuthorizerWithContextResult<TAuthorizerContext> = {
    principalId: "client",
    policyDocument,
    context,
  };

  return response;
};
