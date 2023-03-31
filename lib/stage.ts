import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ECSStack } from "./ecs-stack";

export class AppStage extends cdk.Stage {
	constructor(scope: Construct, stageName: string, props?: cdk.StageProps) {
		super(scope, stageName, props);

		new ECSStack(this, "ECSStack", stageName);
	}
}
