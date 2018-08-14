---
layout: post
title: Scaling Machine Learning in the Cloud with Kubernetes
open_graph:
  title: Contact us
  description: Get in touch and let us know how we can help.
  type: business.business
  image: /assets/open_graph_preview.png
---

# Distributed TensorFlow on Kubernetes

Building production-ready Machine Learning/Deep Learning/Data Science systems is complex. The setup of the services and tools required for effective development and deployment of ML models is time consuming. The aim of this blog post is to look at the challenges faced by Data Scientists and how these can be resolved. 

## The Challenges

1. Build once, run ~~everywhere~~ locally:
This issues is not new to any kind of software development. You write an algorithm on your laptop or your computer, test it by training it locally and produce a model. It works well and you are proud of your work! When you promote your work to the proceeding environments or your colleague tries to run it, it fails! You carry out extensive checks and realise that there is a conflict of framework version between your and rest of the environments e.g. Python 3.0 instead of Python 2.7! 

2. My machine can't handle it: There comes a point while developing models that the machine you are using will not be enough to train your model. Sure, you could buy a powerful gaming PC. However, you will have to wait for it to be delivered and set it all up with the required pre-requsistes. If you are working in a team and they all require the same setup, buying a powerful machine for each of the members will not be financially viable. Another issue will be that these machines will be under-utilised.

3. The whole setup is too complex:  
The expectation of a data scientist/ML engineer is that they will focus on a handful of things such as writing an algorithm, training the model, testing and evaluating the outcome of the model.

![Data Science Expectations]({% link _blog/scaling-machine-learning-with-kubeflow-TensorFlow/datascience_expectation.png %})

The reality however is very sobering, the data scientist will have to deal with a myriad of things. Set up the infrastructure that can serve the required models, set up monitoring tools, think about resource management and the list goes on! 

![Data Science Reality]({% link _blog/scaling-machine-learning-with-kubeflow-TensorFlow/datascience_reality.png %})

In order to become a data scientist, one has to quickly grasp and specialise other aspects of software development, operations and infrastructure management.  

4. Training a bunch of models repeatedly

Imagine you have a product that relies on three types of models. One that is recommendation system based, another one that serves an antispam model and another that predicts churn rate. Based on the data that the system receives, a data scientist would ideally like iterate through a number of versions by tweaking the training parameters. Eventually settling for a final version.

![Training Models]({% link _blog/scaling-machine-learning-with-kubeflow-TensorFlow/training_models.png %})

In most scenarios this will not be a one-time job. The model will have to be trained at least once everyday, if not more frequently. Running the training manually can be error-prone and a very slow process.

![Training Models Everyday :(]({% link _blog/scaling-machine-learning-with-kubeflow-TensorFlow/training_models_everyday.png %})

So far we have discussed about the issues that a data scientist/machine learning engineer faces day-to-day. All of these issues slow down the process of training and serving these models for an end product. If a data scientist could do the following then they will get more time to focus on writing algorithms and training the model.

- Rent a fleet of machines by the hour for training and use them only when required
- Mix the training nodes with CPUs, GPUs, TPUs an
- Scale the whole infrastructure instantly and  in an automated fashion 

### ENTER KUBERNETES

## What is Kubernetes?
<TODO> What is K8s and how it helps with containerised applications and how it can provision resources. Perhaps explain what containers are.

<TODO> How it helps with splitting up of jobs and deploying them in servers which have the capacity

### ENTER KUBEFLOW

## What is Kubeflow?

<TODO> How Kubeflow uses Kubernetes API to help with serving of models.

<TODO> Different parts of Kubeflow: 
- Pytorch
- Jupyter Notebooks
- Tensorflow
- Hyperparameter tuning


## Train ML Model


Build a fully integrated pipeline to train your machine learning models with TensorFlow and Kubernetes.

This repo will guide you through:

1. setting up a local environment with python, pip and TensorFlow
1. packaging up your models as Docker containers
1. creating and configuring a Kubernetes cluster
1. deploying models in your cluster
1. scaling your model using Distributed TensorFlow
1. serving your model
1. tuning your model using hyperparameter optimisation

## Prerequisites

You should have the following tools installed:

- git
- kubectl
- python 2.7 and pip
- bash
- an account on Docker Hub

## Recognising handwritten digits

You are given a set of images with handwritten digits and you wish to transcribe them.

![MNIST dataset]({% link _blog/scaling-machine-learning-with-kubeflow-TensorFlow/MNIST.png %})

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

![TensorFlow programming stack]({% link _blog/scaling-machine-learning-with-kubeflow-TensorFlow/TensorFlow_programming_environment.png %})

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

> Please note that there's no specific integration with Elastic Kubernetes Service (EKS) on AWS at the moment. You can install Kubeflow on EKS, but you won't get the same level of support as GKE or AKS.

Most of the cloud providers will lure you in with some free credits, so you can pick the one you like the most.

Once you've made your choice, create a cluster with 3 nodes.

You don't need large machines, even a node with 4GB of memory will do the job.

You can follow the links below to set up your cluster on the provider of your choice:

- GKE
- AKS

Come back when you're ready.

_Are you ready yet?_

Please make sure you can successfully connect to the cluster with:

```bash
kubectl get all --all-namespaces
```

> kubectl is the client that sends instructions to the cluster.

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

```bash

Retrieve the name of the TensorFlow Serving's Pod with:

```bash
kubectl get pods -l app=tf-serving
```

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
