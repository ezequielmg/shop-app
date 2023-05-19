import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { WebsiteConstruct } from './packages/website';
import { GatewayConstruct } from './packages/gateway';
import { PersistanceConstruct } from './packages/persistance';

export class ShopAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Website (S3 + CloudFront)
    const website = new WebsiteConstruct(this, 'website')

    // Persistance (DynamoDB)
    const persistance = new PersistanceConstruct(this, 'persistance')

    // Gateway (API Gateway + Lambda)
    const gateway = new GatewayConstruct(this, 'gateway', {
      tables: persistance.tables
    })
  }
}
