import { RemovalPolicy } from "aws-cdk-lib";
import {
  AttributeType,
  BillingMode,
  ITable,
  Table,
} from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export type TTables = {
  posts: ITable,
  stocks: ITable
}

export class PersistanceConstruct extends Construct {
  public readonly tables: TTables;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Best practice is to follow the "Single Table Design" pattern,
    // but for simplicity purposes we will divide entities in tables

    // DynamoDB
    // -> Posts
    const posts = new Table(this, "postsTable", {
      partitionKey: { name: "id", type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    // -> Stocks
    const stocks = new Table(this, "stocksTable", {
      partitionKey: { name: "product_id", type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    this.tables = {
      posts,
      stocks
    }
  }
}
