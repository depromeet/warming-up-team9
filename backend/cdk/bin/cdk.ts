#!/usr/bin/env node
import "source-map-support/register";
import cdk = require("@aws-cdk/core");
import { Jjayo } from "../lib/cdk-stack";

const app = new cdk.App();
new Jjayo(app, "JjayoStack");

app.synth();
