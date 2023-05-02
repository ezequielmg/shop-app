# Shop-APP

This project is intended to follow up the AWS Javascript Course hosted at [Cloud Development Course](https://github.com/EPAM-JS-Competency-center/cloud-development-course-initial) with some adjustments:
* Serverless framework and libraries got removed from the frontend app
* Instead, AWS CDK is used in order to model and provision resources

Additional Notes:
* As this is intended for demostration purposes and course completion, current scope of the project won't automate the full infrastructure + frontend build and push cycle (See: `How to deploy the application` section)

### Stack:
* ReactJS
* Typescript
* AWS CDK (for Insfrastructure)

### Requirements:
* NodeJS v16+
* AWS Account and User with (Administrative permissions)
  * This is needed to create a new set of credentials (secret+key) locally that CDK will use
* AWS CLI
  * The AWS CLI allows you to interact with AWS services from a terminal session
* AWS CDK
  * Command-line utility which allows you to work with CDK apps.
  * https://docs.aws.amazon.com/cdk/v2/guide/cli.html
* Docker
  * Needed to build typescript Lambda functions within CDK (Infrastructure) project
  * Automatically executed when executing CDK commands

### Installation (For both frontend + infrastructure):
* npm install

### Usage:
###### Frontend:
`npm run dev`

###### Infrastructure (Most used commands):
* `cdk diff`
* `cdk synth`
* `cdk deploy`

Note: Default AWS profile is used, if using a specific one use previous commands with:
`--profile <profile>`

### How to deploy the application:
1. First, infrastructure deployment is performed and we'll receive some output variables
```
cd infrastructure
cdk deploy
```
At the end the command will output some deployment info that is needed to access the app:
  * API Gateway URL
  * CDN Frontend (This is the public url to access the application)
2. Use the `API Gateway URL` and configure it inside the `frontend` project at: `src/constants/apiPaths.ts`, after that you can build the project with `npm run build` which will create a `dist` folder
3. Go to AWS S3 and shop-app bucket created on AWS S3 and upload the contents of the `dist` folder previously created

Notes: All this process can be automated but requires additional coding that is outside of the scope of the current stage of this repository

### Recommendations:
Follow up the CDK Workshop to get familiar with CDK ecosystem (App, Stack and Constructs) + comonly used commands (diff, synth, deploy)
* https://cdkworkshop.com/