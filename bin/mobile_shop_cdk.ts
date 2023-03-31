#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { MobileShopCdkStack } from "../lib/app";

const app = new cdk.App();
new MobileShopCdkStack(app, "MobileShopCdkStack", {
	env: {
		account: "265015879441",
		region: "us-east-1",
	},
});
