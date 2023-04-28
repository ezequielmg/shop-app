import { CfnOutput, RemovalPolicy } from "aws-cdk-lib";
import { CloudFrontWebDistribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { CanonicalUserPrincipal, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class WebsiteConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const cloudFrontOIA = new OriginAccessIdentity(this, 'originAccessIdentity');

    const bucket = new Bucket(this, 'shopApp', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL
    })

    bucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [bucket.arnForObjects('*')],
        principals: [
          new CanonicalUserPrincipal(cloudFrontOIA.cloudFrontOriginAccessIdentityS3CanonicalUserId)
        ]
      })
    )

    const distribution = new CloudFrontWebDistribution(this, 'distribution', {
      originConfigs: [{
        s3OriginSource: {
          s3BucketSource: bucket,
          originAccessIdentity: cloudFrontOIA
        },
        behaviors: [{
          isDefaultBehavior: true
        }],
      }]
    })

    // Output
    new CfnOutput(this, 'cloudFrontDomain', {
      value: `https://${distribution.distributionDomainName}`,
      description: 'Distribution url linked to the static website',
      exportName: 'websiteUrl'
    })
  }
}
