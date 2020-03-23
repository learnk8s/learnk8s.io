**TL;DR:** You can create and connect to databases or messages brokers from within Kubernetes by manually creating the resources, using the Service Catalogue or with a tool that excute Infrastructure as Code script in your cluster.

There are two main kinds of application that you can deploy in Kubernetes: stateless and stateful apps.

Stateless applications don't hold any state and are an excellent use case for Kubernetes.

With stateless apps, you can take advantage of the horizontal scaling and survive Pod evictions with limited to no disruption of Service.

You can also schedule Podds anywhere in your infrastructure without having particular constraints.

Since you don't have state, there's no need to attach disks located in particular Nodes.

On the contrary, stateful applications present quite a few challenges:

- Pods should have access to persistent disks which could be located on specific nodes.
- It's often impractical to move volumes with Terabytes of data to other Nodes. Stateful apps are usually scheduled and respawned on the same Nodes.
- Stateful apps should not compete for I/O. You should isolate the workloads for noisy neighbours.
- There should be a backup and retention policy in place.
- You might need to configure failover and leader election, and sharding and rebalancing.

You can be successful at running stateful applications on Kubernetes such as databases or message brokers if you invest the time to learn how to operate it.

_But what if you don't have the expertise and time, but still need to provide a production-grade database to your teams?_

_What if you're a team of one and prefer using an external message broker service with a guaranteed Service Level Agreement (SLA)?_

A popular option is to leverage managed services from a cloud vendor.

Cloud providers such as Amazon Web Services, Google Cloud Platform and Azure offer several managed services such as:

- Databases ([Amazon RDS](https://aws.amazon.com/rds/), [Azure Database](https://azure.microsoft.com/en-us/product-categories/databases/), [GCP Cloud SQL](https://cloud.google.com/sql))
- Message brokers [Amazon SQS](https://aws.amazon.com/sqs/), [Azure Service Bus](https://azure.microsoft.com/en-us/services/service-bus/), [Cloud Pub/Sub](https://cloud.google.com/pubsub)
- Elastic Search ([Amazon Elasticsearch Service](https://aws.amazon.com/elasticsearch-service/), [Azure Elasticsearch Service](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/elastic.elasticsearch))

When you need a MySQL database for your app, you don't have to worry about provisioning it from scratch.

You can ask your cloud provider to provide an instance.

And since the cloud provider offers APIs, you can also script creating, updating and deleting databases.

You can use tools such as Terraform or Cloudformation to create the database programmatically when you create an environment such as dev or prod.

The community contributed to several scripts and modules to make it easier to provision databases, messages brokers, etc.

Here's a short selection:

- [Terraform AWS RDS module](https://github.com/terraform-aws-modules/terraform-aws-rds)
- [Terraform Azure Database](https://github.com/Azure/terraform-azurerm-database)
- [Terraform Cloud SQL](https://github.com/terraform-google-modules/terraform-google-sql-db)

Utilising managed services is convenient because you can focus on delivering your app, and the cloud provider on running a reliable service.

_What if you could use the same managed services in your Kubernetes cluster?_

_If Amazon RDS, Cloud SQL and Azure Database are so convenient, why not use those instead of rolling out and maintaining your database in Kubernetes?_

The good news is that you can use managed services in Kubernetes.

However, there is little consensus on how you should provision those resources and make them available to your apps in the cluster.

There are three options you can choose from:

1. Externally provisioned — you can create the managed resource on your cloud provider and store the details such as connection detail, username and password in Kubernetes
1. Internally provisioned using Custom Resource Definitions (CRDs) — You can map the managed resources to Kubernetes objects and have a component that creates the resources on the cloud provider
1. Internally provisioned using infrastructure as code (IaC) — You can script creating the resources. The script is stored and executed in the cluster.

Let's explore the three options in more detail.

## Provisioning managed resources externally

You can provision your managed databases or message brokers manually or using a tool such as Terraform or Cloudformation.

And you can pass the details such as username or password to your apps using a [Kubernetes Secret](https://kubernetes.io/docs/concepts/configuration/secret/).

Let's have a look at an example.

You can provision an Amazon RDS database with:

```terminal|command=1,2,3-9,10-11,12-13|title=bash
export USERNAME=master
export PASSWORD=secret99
aws rds create-db-instance \
  --allocated-storage 20 \
  --db-instance-class db.m1.small \
  --db-instance-identifier test-instance \
  --engine mysql \
  --master-username $USERNAME \
  --master-user-password $PASSWORD
aws rds wait db-instance-available \
  --db-instance-identifier test-instance
aws rds describe-db-instances \
  --db-instance-identifier test-instance
```

The output of the last command is a JSON payload with the endpoint of the database.

```json|highlight=10|title=aws-cli-output.json
{
  "DBInstances":[
    {
      "DBInstanceIdentifier":"test-instance",
      "DBInstanceClass":"db.m5.large",
      "Engine":"postgres",
      "DBInstanceStatus":"available",
      "MasterUsername":"master",
      "Endpoint":{
        "Address":"test-instance.cddqgyucel9j.eu-west-1.rds.amazonaws.com",
        "Port":5432,
        "HostedZoneId":"Z29XKXDKYMONMX"
      }
      /* ... more details */
    }
  ]
}
```

You can combine username, password, connection string and the rest of the database details in a Kubernetes secret with:

```terminal|command=1|title=bash
☄apiVersion: v1
kind: Secret
metadata:
  name: my-secret
type: Opaque
data:
  username: bWFzdGVy # master
  password: c2VjcmV0OTk= # secret99
  connection_url: |
    dGVzdC1pbnN0
    YW5jZS5jZGRx
    Z3l1Y2VsOWou
    ZXUtd2VzdC0x
    LnJkcy5hbWF6
    b25hd3MuY29t
    # test-instance.cddqgyucel9j.eu-west-1.rds.amazonaws.com
```

> Please notice that all the values in a Kubernetes secret are encoded using base64.

You can use the values from the Secret in any Pod.

Below there's an example on how you could inject the values as environment variables:

```yaml|title=pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: app
    env:
      - name: DB_USERNAME
        valueFrom:
          secretKeyRef:
            name: my-secret
            key: username
      - name: DB_PASSWORD
        valueFrom:
          secretKeyRef:
            name: my-secret
            key: password
      - name: DB_URL
        valueFrom:
          secretKeyRef:
            name: my-secret
            key: connection_url
```

Let's have a look at some of the advantages of managing resources externally:

1. If you've already use managed services, the steps above are familiar. The only change is storing the values in a Kubernetes secret.
1. It is flexible as you can create the managed service manually, through the command line, with Terraform or Clouformation, etc.
1. If you want to share an existing managed service, you only need to copy the details in the Kubernetes Secret.

Managing resources externally has some drawbacks too, though:

1. You need to have a strategy to keep the credentials in sync. You can manually copy them or have a script that does on your behalf.
1. You need to create the database or message broker ahead of time.
1. The managed serviced is deployed separately from the app. You can't use `kubectl apply -f` and create an entire stack with a single command.

If you're willing to accept the trade-offs, managing resources externally is a viable option to have apps in Kubernetes consuming cloud provider services such as a database.

_But what if you want to manage those resources as if they were part of Kubernetes?_

Imagine you could create a new type of Kubernetes object such as a database object:

```yaml|title=database.yaml
apiVersion: my-example-api.com/v1
kind: ManagedDatabase
metadata:
  name: rds-mysql
spec:
  version: "11.5"
  storageType: Durable
```

Every time you submit that YAML resource to the cluster, a script calls the cloud provider APIs and creates the database.

When the database is ready, a Secret is created with the connection string, username, password, etc.

Imagine, with a single `kubectl apply -f` you could deploy the app (as a Deployment) and the database (as a managed service).

_Does that work in Kubernetes?_

_Can you create a `ManagedDatabase` object?_

You can get close.

## Managed services and Custom Resource Definitions

Cloud providers have an extensive collection of managed services.

And all the managed services can be scripted: the cloud provider exposes an API to create, update, consume and delete resources.

So, before you start using services from a cloud provider, you could do three things:

1. Collect all the managed serviced that you wish to use into a list.
1. Create a Kubernetes object for each item in that list.
1. Create a component that can map custom Kubernetes objects to the cloud provider managed services.

In other words:

1. Your cluster knows that there's a new `ManagedDatabase` resource.
1. When you submit a YAML definition for a `ManagedDatabase`, there's a script that calls the cloud provider APIs and creates the database.

As you can imagine, you could end up with a long but useful list.

You could also open source it and share it with your friends and colleagues.

The Kubernetes community did precisely that, but they developed a more generic solution called the Service Catalog.

The Service Catalog is a pluggable system that integrates to the cloud provider and lists all managed services available.

It also maps resources — if you use Amazon Web Services (AWS), you can create an RDS database object in Kubernetes.

The Service Catalog is available on all major cloud providers ([Azure](https://github.com/Azure/open-service-broker-azure), [Amazon Web Service](https://github.com/awslabs/aws-servicebroker), [Google](https://github.com/GoogleCloudPlatform/gcp-service-broker)) and others as well.

Let's have a look at how it works in Amazon Web Services.

> Please note that the steps are similar for other cloud providers.

[You can follow these steps to install the Service Catalogue on AWS.](https://github.com/learnk8s/service-catalog-aws)

Once the Service Catalogue is installed, you can list all available resources with:

```terminal|command=1|title=bash
kubectl get ClusterServiceClasses
NAME                                   EXTERNAL-NAME      BROKER
079bab7e-5fb3-5e50-a91a-46ce25ec44d5   elasticsearch      sb
20ac3b60-8526-5327-9ea3-4f7893bed097   dynamodb           sbs
499aa9c6-085f-5e46-9c59-f063acb20538   sns                sb
9ff60dab-f1de-53c7-baf4-47c70ed95419   redshift           sb
ad60756e-7482-5077-9883-2fe99ec45fd4   route53            sb
baa70642-2fab-5615-ad19-05885f2be690   rdsmysql           sb
ca3e9a89-0310-530b-8a5d-21ef88888822   s3                 sb
cf1eda6f-8515-5d75-ba12-4a82c283d30d   sqs                sb
d56a51f6-75f2-5f42-a613-3d9aff5e33f1   rdsmariadb         sb
e15beaa5-e813-5b58-aa27-0b1f61d91a80   rdspostgresql      sb
f4b249ea-71ea-59dd-9d0b-4f7f1c651b5d   rdsmssql           sb
```

> Please note that the above output is truncated.

You can inspect the class for the S3 service with:

```terminal|command=1|title=bash
kubectl get clusterserviceclasses ca3e9a89-0310-530b-8a5d-21ef88888822 -o yaml
```

The response is a YAML definition:

```yaml|title=output.yaml
apiVersion: servicecatalog.k8s.io/v1beta1
kind: ClusterServiceClass
metadata:
  name: ca3e9a89-0310-530b-8a5d-21ef88888822
spec:
  bindable: true
  bindingRetrievable: false
  clusterServiceBrokerName: sb
  description: AWS Service Broker - Amazon S3
  externalID: ca3e9a89-0310-530b-8a5d-21ef88888822
  externalMetadata:
    displayName: Amazon S3
    documentationUrl: https://aws.amazon.com/documentation/s3/'
    imageUrl: https://s3.amazonaws.com/awsservicebroker/icons/Storage_AmazonS3_LARGE.png
    longDescription: Amazon Simple Storage Service (Amazon S3) is storage for the
      Internet. You can use Amazon S3 to store and retrieve any amount of data at
      any time, from anywhere on the web. You can accomplish these tasks using the
      simple and intuitive web interface of the AWS Management Console.
    outputsAsIs: false
    providerDisplayName: Amazon Web Services
  externalName: s3
  planUpdatable: false
  tags:
  - AWS
  - S3
  - Object Storage
```

The ClusterServiceClass is a description of what the Service does.

All the configuration and parameters that you can tune in the service are collected in a Service Plan.

You can retrieve all the Service plans for the AWS S3 Service with:

```terminal|command=1|title=bash
kubectl get clusterserviceplans
NAME                                   EXTERNAL-NAME   BROKER   CLASS
3050c541-df46-55e2-9ecc-71fed5085852   custom          sb       ca3e9a89-0310-530b-8a5d-21ef88888822
733fc2af-ade8-533d-85f3-0bb1051aa2f0   production      sb       ca3e9a89-0310-530b-8a5d-21ef88888822
```

> Please make sure that the "CLASS" column matches the "NAME" of the service — and not the "EXTERNAL NAME".

You can inspect the plan for the AWS S3 Service with:

```terminal|command=1|title=bash
kubectl get clusterserviceplan 3050c541-df46-55e2-9ecc-71fed5085852 -o yaml
```

> Please note that `3050c541-df46-55e2-9ecc-71fed5085852` is the name of the plan.

The response is a (rather long) YAML definition:

```yaml|highlight=23-31|title=s3-custom-plan.yaml
apiVersion: servicecatalog.k8s.io/v1beta1
kind: ClusterServicePlan
metadata:
  name: 3050c541-df46-55e2-9ecc-71fed5085852
spec:
  bindable: true
  clusterServiceBrokerName: sb
  clusterServiceClassRef:
    name: ca3e9a89-0310-530b-8a5d-21ef88888822
  description: S3 Bucket pre-configured with custom configuration
  externalID: 3050c541-df46-55e2-9ecc-71fed5085852
  externalMetadata:
    cost: https://aws.amazon.com/s3/pricing/
    displayName: Custom
    longDescription: Amazon Simple Storage Service (Amazon S3) is storage for the
      Internet. You can use Amazon S3 to store and retrieve any amount of data at
      any time, from anywhere on the web. You can accomplish these tasks using the
      simple and intuitive web interface of the AWS Management Console.
  externalName: custom
  free: false
  instanceCreateParameterSchema:
    type: object
    properties:
      BucketName:
        default: Auto
        description: Must contain only lowercase letters, numbers, periods (.), and
          hyphens. If set to Auto, a bucket name will be generated (-),Cannot end
          in numbers
        title: BucketName
        type: string
      # ... more properties
```

To create an instance of S3, you have to combine ClusterServiceClass and ClusterServicePlan in a ServiceInstance resource:

```yaml|highlight=6,7|title=s3.yaml
apiVersion: servicecatalog.k8s.io/v1beta1
kind: ServiceInstance
metadata:
  name: my-s3-instance
spec:
  clusterServiceClassExternalName: s3
  clusterServicePlanExternalName: custom
  parameters:
    BucketName: my-test-20200325
```

As soon as you type the command, the Service broker calls the APIs and create the resource.

You can check the progress with:

```terminal|command=1|title=bash
kubectl describe ServiceInstance my-s3-instance
```

When the broker completes, you should see a message confirming that the resource is created.

_But do you trust it?_

You can verify that the resource is created **for real** by listing the S3 buckets on AWS with:

```terminal|command=1|title=bash
aws s3api list-buckets
{
  "Buckets":[
    {
      "Name":"my-test-20200325",
      "CreationDate":"2020-03-25T06:36:45+00:00"
    },
    {
      "Name": "my-test-20200325-logging",
      "CreationDate": "2020-03-25T06:36:18+00:00"
    }
  ],
  "Owner":{
    "DisplayName":"learnk8s",
    "ID":"8b10"
  }
}
```

Excellent, the resource exists!

_How do you access it in the cluster, though?_

You need to bind the resource to use it.

You should create a ServiceBinding resource:

```yaml|title=s3-binding.yaml
apiVersion: servicecatalog.k8s.io/v1beta1
kind: ServiceBinding
metadata:
  name: my-s3-binding
spec:
  instanceRef:
    name: my-s3-instance
```

At this point, the broker server will retrieve and store the credentials to access S3 into a Kubernetes secret.

You can check the progress with:

```terminal|command=1|title=bash
kubectl describe servicebinding my-s3-binding
```

_Did it create a Kubernetes Secret?_

```terminal|command=1|title=bash
kubectl get secrets
NAME                  TYPE                                  DATA
default-token-zbl2r   kubernetes.io/service-account-token   3
my-s3-binding         Opaque                                6
```

Excellent, let's inspect the secret:

```terminal|command=1|title=bash
kubectl get secret my-s3-binding -o yaml
apiVersion: v1
data:
  BUCKET_ARN: Y2F0Y2htZWlmeW91Y2Fu
  BUCKET_NAME: Y2F0Y2htZWlmeW91Y2Fu
  LOGGING_BUCKET_NAME: c21hcnRjb29raWU=
  S3_AWS_ACCESS_KEY_ID: c21hcnRjb29raWU=
  S3_AWS_SECRET_ACCESS_KEY: Y2F0Y2htZWlmeW91Y2Fu
  S3_REGION: c21hcnRjb29raWU=
kind: Secret
metadata:
  name: my-s3-binding
type: Opaque
```

Great, you can use the value in the Secret to connect to the S3 bucket.

## Service broker limitations

In the previous example, you provisioned an S3 bucket in Amazon Web Services, but you can create other services such as Databases (RDS) and message brokers (SQS, AMQP).

You can also set up a Service Catalog and broker for Azure and create managed services there.

Creating managed resources requires two Custom Resource Definitions (ServiceInstance and ServiceBinding), but it's straightforward once you understand how it works.

There's one caveat, though.

There's no easy way to import or bind to existing resources.

Imagine you have three clusters:

1. One for the development environment.
1. One for the testing environment.
1. One for the production environment.

The production environment has its own database, but you want to share a single database between testing a development.

_How can you do so with the Service Catalog?_

You can't, unless you copy the Secret from one cluster to the other.

So you're back at square one: provisioning resources and manually copying secrets.

_What options do you have to create and import resources?_

_Is there anything similar to the Service Catalogue?_

## Terraform to the rescue

The Service Catalog runs a controller that calls the cloud provider APIs to create resources.

_What if you could replace that controller with another?_

That's the idea behind Kubeform — a controller that crates cloud resources using Terraform.

When you install Kubeform in your cluster, you can create resources likes this:

```yaml
apiVersion: aws.kubeform.com/v1alpha1
kind: S3Bucket
metadata:
  name: my-bucket
spec:
  bucket: my-bucket-20200325
  providerRef:
    name: aws
```

Kubeform runs a controller that receives the YAML resource, invokes Terraform and create the S3 bucket.

_It looks very similar to the Service Catalog, so what's the difference?_

Kubeform calls the Terraform provider for Amazon Web Services (AWS), Google Cloud, Azure etc.

Terraform is a mature product, and it is battle-tested in production by small and large companies.

As a consequence, it has the most up to date list of configurations parameters.

As an example, when configuring an S3 Bucket, the Service catalogue exposes about twelve properties that you can customise such as:

- BucketAccessControl
- BucketName
- EnableGlacierLifeCycle
- EnableLogging
- etc.

For the same object, [Terraform has over a hundred fields](https://www.terraform.io/docs/providers/aws/r/s3_bucket.html).

Also, when you use the Service Catalog, all the parameters in the ServiceInstance object are unchecked.

You can add as many properties as you want, Kubernetes won't stop you:

```yaml|highlight=11|title=s3.yaml
apiVersion: servicecatalog.k8s.io/v1beta1
kind: ServiceInstance
metadata:
  name: my-s3-instance
spec:
  clusterServiceClassExternalName: s3
  clusterServicePlanExternalName: custom
  parameters:
    BucketName: my-test-20200325
    something: random_string
```

However, you will see an error as soon as the Service Catalog passes the arguments to the cloud provider.

In contrast, Kubeform exposes Custom Resource Definitions (CRDs).

```yaml|highlight=7
apiVersion: aws.kubeform.com/v1alpha1
kind: S3Bucket
metadata:
  name: my-bucket
spec:
  bucket: my-bucket-20200325
  something: random_string
  providerRef:
    name: aws
```

Kubernetes will validate the resource and make sure that only defined fields are accepted.

_So, should you always use Kubeform instead of the Service Catalog?_

Terraform stores the current state of the infrastructure into a state file.

If you run a command twice, Terraform provision the difference between the current and previous state only.

Kubeform stores the state in etcd — similarly to the Service Catalog.

But there's no easy way to retrieve the state of fix it when it gets corrupted.

And this happens quite often with Terraform.

Also, Kubeform cannot import existing resources in the Terraform state.

So if you want to share a database between development and testing environment, you're out of luck — again.

## Exploring more options on Amazon Web Services (AWS)

Amazon Web Services offers the Service Catalog integration as well as the AWS Service Operator — a component that lives in the cluster and is capable of creating managed resources.

The operator works similarly to the Service Broker, but instead of using ServiceInstances and ServiceBindings, you use Custom Resource Definitions (CRDs).

Here's an example of how you can define a DynamoDB table:

```yaml|title=dynamodb.yaml
apiVersion: service-operator.aws/v1alpha1
kind: DynamoDB
metadata:
  name: dynamo-table
spec:
  hashAttribute:
    name: name
    type: S
  rangeAttribute:
    name: created_at
    type: S
  readCapacityUnits: 5
  writeCapacityUnits: 5
```

But there's something you should know.

The AWS Service operator was initially released in 2018 and is currently deprecated without migration path.

At the time of writing, the engineering team at Amazon is rewriting the operator from the ground up.

While it's an excellent alternative to the Service Catalog, it's not viable at the moment.

## Exploring more options on Google Cloud

Google Cloud offers the [Config Connector](https://cloud.google.com/config-connector) — a component that lives in the cluster and behaves like the Service Catalog.

You can use the Config Connector to create managed services such as [Cloud Spanner](https://cloud.google.com/spanner) and [Big Query](https://cloud.google.com/bigquery) using Custom Resource Definitions (CRDs).

Here's the definition for Spanner:

```yaml|title=spanner.yaml
apiVersion: spanner.cnrm.cloud.google.com/v1beta1
kind: SpannerInstance
metadata:
  labels:
    label-one: "value-one"
  name: spannerinstance-sample
spec:
  config: regional-us-west1
  displayName: Spanner Instance Sample
  numNodes: 1
```

On the plus side, Google deigned Config Connector to work nicely with existing service.

If you have an existing Cloud SQL or Cloud Pub/Sub [you can import those in the cluster](https://cloud.google.com/config-connector/docs/how-to/managing-deleting-resources).

## Other tools

- If you liked the idea behind Kubeform and you want to explore more options, you should check out the [Terraform controller](https://github.com/rancher/terraform-controller) and [Cloudformation operator](https://github.com/linki/cloudformation-operator).
- [Crossplane](https://github.com/crossplane/crossplane) offers a set of Kubernetes Custom Resource Definitions (CRDs) and controllers that provision and manage services on cloud providers. In other words, Crossplane is a Service Catalog equivalent but build with CRDs.
- The [Service Binding Operator](https://github.com/redhat-developer/service-binding-operator) is an exciting twist on the Service Broker. It focuses on binding service and apps and doesn't deal with cloud provider-specific implementations.

## Summary and way forward

There are several ways to configure managed services such as databases in your cluster.

Some options are fully integrated with your cluster, and they behave as if they were deployed in the cluster.

With the Service Catalog, for example, you submit a YAML definition in the cluster the triggers the creation of a managed resource in your cloud provider.

Managing resources with Kubernetes feel natural, and you can offer a more consistent and unified experience to the user of your cluster.

_But what's the price?_

Most of the solutions discussed above are quite complicated:

- You need to create and understand the lifecycle of a resource in the Service Catalog.
- Kubeform is an ingenious tool to provision infrastructure with Terraform, but it's hard to debug and fix issues with the state.
- Proprietary tools such as Google Config Connector and AWS Service Operator are great, but they are not mature.

And even if you can manage the complexity, there is a deal-breaker for most of them: you can't import existing managed services.

You can't import an existing database in your cloud provider with the following tools:

- Service Catalog
- Kubeform
- AWS Service operator

That's not something that you can easily ignore.

_So what's the alternative?_

You can still provision resources externally and then manually create a Secret in the cluster with the credential.

It's manual and limiting, but it's straightforward, and it works.

_Is there anything better than that?_

Not without a lot of trade-offs.

The [Service Binding Operator](https://github.com/redhat-developer/service-binding-operator) is one of the most exciting experiments in this area, but it's designed to run on OpenShift and support only a few cloud services.

## Closing notes and further reading

A few notes on the Service Catalog:

- The Engineering team at Amazon Web Services are planning to [merge the AWS Service Operator and the AWS Service Broker](https://github.com/aws/aws-service-operator-k8s/issues/19#issuecomment-575534359).
- [OpenShift deprecated the Service Catalog](https://docs.openshift.com/container-platform/4.1/release_notes/ocp-4-1-release-notes.html#ocp-4-1-notable-technical-changes).
