import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecsp from "aws-cdk-lib/aws-ecs-patterns";
import * as ecr from "aws-cdk-lib/aws-ecr";

export class ECSStack extends cdk.Stack {
	constructor(
		scope: Construct,
		id: string,
		stageName: string,
		props?: cdk.StackProps
	) {
		super(scope, id, props);
		new ecsp.ApplicationLoadBalancedFargateService(
			this,
			"MobileShopServiceECS",
			{
				taskImageOptions: {
					image: ecs.ContainerImage.fromEcrRepository(
						ecr.Repository.fromRepositoryName(
							this,
							"MobileShopServiceECR",
							"mobileshop-service"
						)
					),
				},
				publicLoadBalancer: true,
			}
		);
	}
}
