import { expect as expectCDK, matchTemplate, MatchStyle } from "@aws-cdk/assert";
import cdk = require("@aws-cdk/core");
import Cdk = require("../lib/cdk-stack");

test("Empty Stack", () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Cdk.Jjayo(app, "JjayoStack");
    // THEN
    expectCDK(stack).to(
        matchTemplate(
            {
                Resources: {},
            },
            MatchStyle.EXACT,
        ),
    );
});
