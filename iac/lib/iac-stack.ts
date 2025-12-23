import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as authorizers from 'aws-cdk-lib/aws-apigatewayv2-authorizers';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const testFn = new lambda.Function(this, 'TestFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset('../src/test-deployment'),
    });

    const api = new apigwv2.HttpApi(this, 'TestApi', {
      apiName: 'test-api',
      defaultAuthorizer: new authorizers.HttpIamAuthorizer(),
    });
    // Rate Limiting (Stage Throttling)
    const stage = api.defaultStage?.node.defaultChild as apigwv2.CfnStage;
    if (stage) {
      stage.defaultRouteSettings = {
        throttlingBurstLimit: 100,
        throttlingRateLimit: 50,
      };
    }

    api.addRoutes({
      path: '/test',
      methods: [apigwv2.HttpMethod.GET],
      integration: new integrations.HttpLambdaIntegration('TestIntegration', testFn),
    });
  }
}
