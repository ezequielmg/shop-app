#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ShopAppStack } from '../lib/shop-app-stack';

const app = new cdk.App();
new ShopAppStack(app, 'ShopAppStack');
