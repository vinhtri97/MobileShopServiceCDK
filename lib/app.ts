import * as cdk from "aws-cdk-lib";
import {
	CodePipeline,
	CodePipelineSource,
	ManualApprovalStep,
	ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { AppStage } from "./stage";

export class MobileShopCdkStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const pipeline = new CodePipeline(this, "Pipeline", {
			pipelineName: "MobileShopServicePipeline",
			synth: new ShellStep("Synth", {
				input: CodePipelineSource.gitHub(
					"vinhtri97/MobileShopServiceCDK",
					"main"
				),
				commands: ["npm ci", "npm run build", "npx cdk synth"],
			}),
		});

		const betaStage = pipeline.addStage(
			new AppStage(this, "beta", {
				env: { account: "265015879441", region: "us-east-1" },
			})
		);

		betaStage.addPre(
			new ShellStep("Run Unit Tests", { commands: ["npm install", "npm test"] })
		);
		betaStage.addPost(
			new ManualApprovalStep("Manual approval before production")
		);

		const prodStage = pipeline.addStage(
			new AppStage(this, "prod", {
				env: { account: "265015879441", region: "us-east-1" },
			})
		);
	}
}
