---
layout: post
title: Recognising handwritten digits at scale with Kubernetes and Tensorflow
description:
date: 2018-10-26 11:26:00
categories: kubernetes docker tensorflow
image:
open_graph:
  type: article
  title: Recognising handwritten digits at scale with Kubernetes and Tensorflow
  image:
  description:
---

You are given a set of images with handwritten digits and you wish to transcribe them.

![MNIST dataset](MNIST.png)

As an example, the above image should be transcribed to 5, 0, 4 and 1.

While you could process the images one by one, it's more convenient to teach a machine how to do that.

You could train a model to look at images and predict what digits they are.

So you can sit back, relax and enjoy your day while the computer does all the work for you.

_Yes, but where do I start?_

## Writing a model in TensorFlow

TensorFlow is a framework for building machine learning algorithms and is the perfect candidate for the task in hand.

Even better, it turns out that recognising digits is a well understood problem and there're plenty of examples online.

For convenience, you can find the source code of the model at [learnk8s/distributed-TensorFlow-on-k8s](https://github.com/learnk8s/distributed-TensorFlow-on-k8s).

You can checkout the code with:

```bash
git clone https://github.com/learnk8s/distributed-TensorFlow-on-k8s
cd distributed-TensorFlow-on-k8s
```

The script downloads the dataset with all the images [from the official website](http://yann.lecun.com/exdb/mnist/).

The dataset is organised in two parts:

- 60000 images for training the model — the training data
- 10000 images for verifing that the model predict the digits as expected — the test data

Each set comes with the image and the corrisponding digit.

In other words, you've all you need to feed the data to the model.

The model is a simple neural network with a variable number of layers.

You feed the first image of a nine to the neural network and expect a nine as an output.

If you don't get a nine, you adjust some of the weights for your network and try again.

And you try sixty thousands time more.

Until you process all your training data.

[TODO: pict]

> If you wish to dive into the details of the algorithm, you should head over to the [official MNIST tutorial on the TensorFlow website](https://www.TensorFlow.org/versions/r1.2/get_started/mnist/pros).

By the end of the process you should have a good enough.

You can repeat the process with the test data and expect the algorithm to predict the digit without manual intervention.

Congratulations, you have your model!

## Show me it works

But you shouldn't trust on just words.

You can test the model yourself.

Create an python environment for the script with:

```bash
virtualenv --system-site-packages src
```

You can activate the environment with:

```bash
cd src
source bin/activate
```

You should install the dependencies with:

```bash
pip install -r requirements.txt
```

Finally you can test that the script works as expected with:

```bash
python main.py
```

_That was quick!_

Training the model is quick because the dataset is small and you only have few layers in your neural network.

As soon as you start playing with a more layers or a less aggressive learning rate things become slow.

_Very slow._

However you don't necessarily have to run the model on your computer.

In these days you can rent cloud computing from cloud providers such as Google, Amazon or Azure.

Perhaps you could buy one or more servers there and reduce the time it takes to train your model.

_Sounds like a plan._

## Writing scalable TensorFlow

Before you scale your training in the cloud, you should pay attention to how you write your program.

TensorFlow exposes three different kinds of APIs: low, mid and high level APIs.

![TensorFlow programming stack](tensorflow_programming_environment.png)

When you use the high level APIs such as the [Estimators API](https://www.TensorFlow.org/programmers_guide/estimators) you benefit from:

- an easier and more human friendly API
- Estimators take care of abstracting the underlying resources from you

The latter benefit is exactly what you need to test and train your model locally with a subset of the data and then move to the cloud with a much larger dataset and a more powerful cluster.

The second detail you should pay attention to is the method you use to train your model.

The only method that works locally and in distributed TensorFlow is `tf.estimator.train_and_evaluate` from the [Estimators API](https://www.TensorFlow.org/api_docs/python/tf/estimator/train_and_evaluate).

If you use `train` and `evaluate` separately your model will work locally, but not when deployed in the cloud.

The third adjustment to your code is to use `export_savedmodel` as the default [mechanism to export your trained models]((https://www.TensorFlow.org/api_docs/python/tf/estimator/Estimator#export_savedmodel).

While you can visualise the output on the screen without doing any export, the method helps a lot when it comes to serving responses with [TensorFlow Serving](https://www.TensorFlow.org/serving/).

In other words, if you wish to serve responses from your model using a server, you should consider using `export_savedmodel` and TensorFlow Serving.

The last recommendation is to use `tf.estimator.RunConfig` to [configure your scripts with TensorFlow]((https://www.TensorFlow.org/api_docs/python/tf/estimator/RunConfig).

The method can recognise when the script runs locally or in distributed mode, so it's a key component you should add to your toolbox.

The example you download has all the above adjustments already included.

So you're ready to deploy!

_But wait. Perhaps you need a cloud first?_

## Scaling your training model to the cloud

The easiest way to run your models in the cloud and across a large number of server is to use Kubernetes.

Kubernetes is an orchestrator: a piece of software that coordinate work across multiple servers.

Great, but you don't want to orchestrate any work, you want to orchestrate TensorFlow training!

Enter Kubeflow.

Kubeflow supercharges Kubernetes with the ability to run distributed TensorFlow jobs.

If you combine the two, you can train your model with thounsands of computer at the same time.

_That sounds like the perfect use case for distributed machine learning!_

_What do you need to run Kubernetes and Kubeflow?_

## Creating a Kubernetes cluster

There're a number of cloud providers that offer Kubernetes _preinstalled_ on their infrastructure.

The most popular choices are:

- Google Kubernetes Engine (GKE), on Google Cloud Platform
- Azure Kubernetes Service (AKS), on Azure
- Elastic container service for Kubernetes (GKE), on Amazon Web Services

Most of the cloud providers will lure you in with some free credits.

In this tutorial you'll create a cluster on Google Cloud Platform, but the same applies to other cloud providers.

At this point you should [sign up for an account on Google Cloud](https://console.cloud.google.com/freetrial).

You'll use `gcloud` — a command-line interface to Google Cloud Platform (GCP) — to create the cluster.

You can download the `gcloud` binary [from the official website](https://cloud.google.com/sdk/downloads).

And you should link your `gcloud` with your account on Google Cloud Platform with:

```bash
gcloud init
```

The command opens a web page and asks you for authorisation.

As soon as you give the go ahead, you can decide to use an existing project or create a new one.

Feel free to create a new project and name it _"kubeflow"_.

To operate a cluster, you need to add a debit/credit card to your account.

You have to go through this tedious process even if you have free credits to spend on GCP.

You can verify that your account is successfully linked to your card with:

```bash
gcloud alpha billing accounts list
```

The column _OPEN_ should display the value _True_.

You can link the billing account to your project with:

```bash
gcloud alpha billing projects link kubeflow \
  --billing-account <replace with billing id>
```

> Please note that you should use the billing id that you listed in the previous step.

You are almost ready to create your first Kubernetes cluster.

But first, you should enable the Google Container Engine clusters and Google Compure Engine APIs.

```bash
gcloud services enable container.googleapis.com
gcloud services enable compute.googleapis.com
```

Finally, create a 3 nodes cluster with:

```bash
gcloud container clusters create distributed-tf --machine-type=n1-standard-8 --num-nodes=3
```

You should install `kubectl` to send instructions to the cluster.

You can follow the instructions on how do that [from the official documentation](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl).

Then, you can obtain the credentials for `kubectl` with:

```bash
gcloud container clusters get-credentials distributed-tf
```

Please make sure you can successfully connect to the cluster with:

```bash
kubectl cluster-info
```

And give yourself admin permission to install kubeflow:

```
kubectl create clusterrolebinding default-admin \
  --clusterrole=cluster-admin \
  --user=<replace with your GCP/Gmail email address>
```

## Installing Kubeflow

You have a Kubernetes cluster, but you are missing Kubeflow.

And Kubeflow can only be installed with a command line tool called `ksonnet`.

The best way to install `ksonnet` is described on the [official documentation](https://ksonnet.io/#get-started).

Once you have it installed, you can move on and download Kubeflow:

```bash
ks init my-kubeflow
cd my-kubeflow
ks registry add kubeflow github.com/kubeflow/kubeflow/tree/v0.1.2/kubeflow
ks pkg install kubeflow/core@v0.1.2
ks pkg install kubeflow/tf-serving@v0.1.2
ks pkg install kubeflow/tf-job@v0.1.2
```

> Please note that those are the same commands that are available on the official website.

Before you can deploy a component, you should copy and customise it.

```bash
ks generate core kubeflow-core --name=kubeflow-core
```

The only customisation needed is the cloud provider:

```bash
ks param set kubeflow-core cloud gcp
```

> You should use `aks` for Azure Kubernetes Service.

One more detail before you start installing Kubeflow.

Create a logical partion of the cluster where you will install all the components.

```bash
kubectl create namespace kubeflow
ks env set default --namespace kubeflow
```

You can finally deploy Kubeflow with:

```bash
ks apply default -c kubeflow-core
```

At this point Kubernetes will download few containers and set up the environment.

You can follow the progress with:

```bash
kubectl get pod --all-namespaces
```

You should also create a shared file system so that you can share store your models.

Create a Disk on Google Cloud Platform with:

```bash
gcloud compute disks create --size=10GB gce-nfs-disk
```

You utilise that disk to create an NFS mount with:

```bash
kubectl create -f kube/nfs-gke.yaml
kubectl create -f kube/pvc-gke.yaml
```

And that was all of it!

Your cluster is ready to run distributed machine learning algorithms.

_Great, but how do I upload my script to Kubernetes?_

You don't.

Kubernetes doesn't run python scripts.

It only knows how to run containers.

## Packaging up your models as Docker containers

You can package your application in a Docker image with:

```bash
cd src
docker build -t learnk8s/mnist:1.0.0 .
```

> Please note that you may want to customise the image to have the username of your Docker Hub account instead of _learnk8s_

You can test the Docker image with:

```bash
docker run -ti learnk8s/mnist:1.0.0
```

You can upload the Docker image to the Docker Hub registry with:

```bash
docker push learnk8s/mnist:1.0.0
```

## Deploying models in your cluster

You can submit a job to Kubernetes to run your Docker container with:

```bash
kubectl create -f kube/job.yaml
```

> Please note that you may want to customise the image for your container.

The job runs a single container and doesn't scale.

However, it is still more convenient than running it on your computer.

## Scaling your model using Distributed TensorFlow

You can run a distributed TensorFlow job on your NFS filesystem with:

```bash

```

The results are stored in the NFS volume.

You can visualise the detail of your distributed TensorFlow job with [Tensorboard](https://www.TensorFlow.org/programmers_guide/summaries_and_tensorboard).

You can deploy Tensorboard with:

```bash

```

Retrieve the name of the Tensorboard's Pod with:

```bash
kubectl get pods -l app=tensorboard
```

You can forward the traffic from the Pod on your cluster to your computer with:

```bash
kubectl port-forward tensorboard-XX-ID-XX 8080:6006
```

> Please note that you should probably use an Ingress manifest to expose your service to the public permanently.

You can visit the dashboard at [http://localhost:8080](http://localhost:8080).

## Serving your model

You can serve your model with [TensorFlow Serving](https://www.TensorFlow.org/serving/).

You can create a TensorFlow Serving server with:

````bash

Retrieve the name of the TensorFlow Serving's Pod with:

```bash
kubectl get pods -l app=tf-serving
````

You can forward the traffic from the Tensorboard's Pod on your cluster to your computer with:

```bash
kubectl port-forward tf-serving-XX-ID-XX 8080:9000
```

> Please note that you should probably use an Ingress manifest to expose your service to the public permanently.

You can query the model using the client:

```bash
cd src
python client.py --host localhost --port 8080 --image ../data/4.png --signature_name predict --model test
```

> Please make sure your virtualenv is still active.

The model should recognise the digit 4.

## Tuning your model using hyperparameter optimisation

The model can be tuned with the following parameters:

- the learning rate
- the number of hidden layers in the neural network

You could submit a set of jobs to investigate the different combinations of parameters.

The `templated` folder contains a `tf-templated.yaml` file with placeholders for the variables.

The `run.sh` script interpolated the values and submit the TFJobs to the cluster.

Before you run the jobs, make sure you have your Tensorboard running locally:

```bash
kubectl port-forward tensorboard-XX-ID-XX 8080:6006
```

You can run the test with:

```bash
cd templated
./run.sh
```

You can follow the progress of the training in real-time at [http://localhost:8080](http://localhost:8080).

## Final notes

The NFS volume is running on a single instance and isn't highly available. Having a single node for your storage may work if you run small workloads, but you should probably investigate [Ceph](http://docs.ceph.com/docs/mimic/cephfs/), [GlusterFS](https://www.gluster.org/) or [rook.io](https://rook.io) as a way to manage distributed storage.
