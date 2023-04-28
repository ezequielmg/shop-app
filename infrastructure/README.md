# Welcome to your CDK TypeScript project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`ShopAppStack`)
which make use of the following services:

1. S3 - Where `frontend` build will be stored
2. CloudFront - CDN for the `frontend` application assets
3. API Gateway - Proxy where endpoints will be defined
4. Lambda - Logical entrypoints to perform persistance operations

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk destroy`     destroy the full application stack (except the CDK toolkit stack)