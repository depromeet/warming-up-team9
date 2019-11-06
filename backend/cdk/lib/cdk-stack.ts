import cdk = require("@aws-cdk/core");
import ec2 = require("@aws-cdk/aws-ec2");
import autoscaling = require("@aws-cdk/aws-autoscaling");
import elbv2 = require("@aws-cdk/aws-elasticloadbalancingv2");
import { ApplicationProtocol } from "@aws-cdk/aws-elasticloadbalancingv2";
import { SubnetType } from "@aws-cdk/aws-ec2";

export class Jjayo extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const vpc = new ec2.Vpc(this, "JjayoVPC");

        const asg = new autoscaling.AutoScalingGroup(this, "ASG", {
            vpc,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
            machineImage: new ec2.AmazonLinuxImage(),
            maxCapacity: 1,
            keyName: "dp-7th",
            vpcSubnets: {
                subnetType: SubnetType.PUBLIC,
            },
        });

        const sshPortSG = new ec2.SecurityGroup(this, "sshPort", {
            vpc,
            description: "Open 22 port to world",
        });
        sshPortSG.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), "allow ssh access from the world");
        asg.addSecurityGroup(sshPortSG);

        const lb = new elbv2.ApplicationLoadBalancer(this, "LB", {
            vpc,
            internetFacing: true,
        });

        const listener = lb.addListener("Listener", {
            protocol: ApplicationProtocol.HTTPS,
            port: 443,
            certificateArns: [
                "arn:aws:acm:ap-northeast-2:770608515633:certificate/adca5d79-63fd-463c-be48-ca9831a7a94a",
            ],
            open: true,
        });

        listener.addTargets("Target", {
            protocol: ApplicationProtocol.HTTP,
            port: 3000,
            targets: [asg],
        });
        listener.connections.allowDefaultPortFromAnyIpv4("Open to the world");
    }
}
