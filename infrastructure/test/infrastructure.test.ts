import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { ShopAppStack } from '../lib/shop-app-stack';

test('SQS Queue and SNS Topic Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new ShopAppStack(app, 'MyTestStack');

  // THEN
  const template = Template.fromStack(stack);


});
