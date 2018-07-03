---
layout: post
title: Scaling Machine Learning in the Cloud with Kubernetes — Infiniteconf 2018
open_graph:
  title: Scaling Machine Learning in the Cloud with Kubernetes — Infiniteconf 2018
  description: This article will guide you through writing models that can be trained with Distributed Tensorflow
  type: business.business
  image: /assets/open_graph_preview.png
---

This article will guide you through:

1. setting up a local environment with python, pip and tensorflow
1. packaging up your models as Docker containers
1. deploying models in your cluster
1. scaling your model using Distributed Tensorflow
1. serving your model
1. tuning your model using hyperparameter optimisation

## Prerequisites

You should have the following tools installed:

- Docker
- git
- kubectl
- python 2.7 and pip
- bash (if you're using Windows we recommend [Cmder](http://cmder.net/))
- an account on Docker Hub
- an account on GKE

## Recognising handwritten digits

MNIST is a simple computer vision dataset. It consists of images of handwritten digits like these:

![MNIST dataset]({% link _pages/infiniteconf2018/MNIST.png %})

It also includes labels for each image, telling us which digit it is. For example, the labels for the above images are 5, 0, 4, and 1.

In this tutorial, you're going to train a model to look at images and predict what digits they are.

## Writing scalable Tensorflow

If you plan to train your model using distributed Tensorflow you should be aware of:

- you should use the [Estimator API](https://medium.com/@yuu.ishikawa/serving-pre-modeled-and-custom-tensorflow-estimator-with-tensorflow-serving-12833b4be421) where possible.
- distribute Tensorflow works only with [tf.estimator.train_and_evaluate](https://www.tensorflow.org/api_docs/python/tf/estimator/train_and_evaluate). If you use the method [train](https://www.tensorflow.org/api_docs/python/tf/estimator/Estimator#train) and [evaluate](https://www.tensorflow.org/api_docs/python/tf/estimator/Estimator#train) it won't work.
- you should save your model with [export_savedmodel](https://www.tensorflow.org/api_docs/python/tf/estimator/Estimator#export_savedmodel) so that Tensorflow serving can serve them
- you should use use [tf.estimator.RunConfig](https://www.tensorflow.org/api_docs/python/tf/estimator/RunConfig) to read the configuration from the environment. The Tensorflow operator in Kubedflow automatically populated the environment variables that are consumed by that class.

## Setting up a local environment

Clone the following repository [learnk8s/distributed-tensorflow-on-k8s](https://github.com/learnk8s/distributed-tensorflow-on-k8s):

```bash
git clone https://github.com/learnk8s/distributed-tensorflow-on-k8s
cd distributed-tensorflow-on-k8s
```

You can create a virtual environment for python with:

```bash
virtualenv --system-site-packages --python /usr/bin/python src
```

> Please note that you may have to customise the path for your `python` binary. You can find your path with `which python`.

You can activate the virtual environment with:

```bash
cd src
source bin/activate
```

You should install the dependencies with:

```bash
pip install -r requirements.txt
```

You can test that the script works as expected with:

```bash
python main.py
```

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

## Creating and configuring a Kubernetes cluster

You should have obtained your config file to connect to a remote cluster.

Move the config file in the kube folder:

```bash
mkdir -p ~/.kube
mv config_file_path ~/.kube/config
```

You can verify that the installation was successfull with:

```bash
kubectl get services
```

You should be able to see a list of resources.

## Deploying models in your cluster

You can submit a job to Kubernetes to run your Docker container with:

```bash
kubectl create -f kube/job.yaml
```

> Please note that you may want to customise the image for your container.

The job runs a single container and doesn't scale.

However, it is still more convenient than running it on your computer.

## Scaling your model using Distributed Tensorflow

You can run a distributed Tensorflow job on your NFS filesystem with:

```bash
kubectl create -f kube/tfjob.yaml
```

The results are stored in the NFS volume.

You can visualise the detail of your distributed tensorflow job with [Tensorboard](https://www.tensorflow.org/programmers_guide/summaries_and_tensorboard).

You can deploy Tensorboard with:

```bash
kubectl create -f kube/tensorboard.yaml
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

![Tensorboard]({% link _pages/infiniteconf2018/tensorboard.png %})

In the dashboard you should pay attention to the accuracy of your model.

The accuracy is actually very poor: around 10%.

Only 1 out 10 samples is correctly recognised.

## Serving your model

You can serve your model with [Tensorflow Serving](https://www.tensorflow.org/serving/).

You can create a Tensorflow Serving server with:

```bash
kubectl create -f kube/serving.yaml
```

Retrieve the name of the Tensorflow Serving's Pod with:

```bash
kubectl get pods -l app=tf-serving
```

You can forward the traffic from the Tensorboard's Pod on your cluster to your computer with:

```bash
kubectl port-forward tf-serving-XX-ID-XX 8081:9000
```

> Please note that you should probably use an Ingress manifest to expose your service to the public permanently.

You can query the model using the client:

```bash
cd src
python client.py --host localhost --port 8081 --image ../data/4.png --signature_name predict --model test
```

> Please make sure your virtualenv is still active.

The model should recognise the digit 4.

## Tuning your model using hyperparameter optimisation

_But how do you improve the accuracy?_

_Could you perhaps tests different parameters?_

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

![Tensorboard]({% link _pages/infiniteconf2018/tensorboard.gif %})

You can follow the progress for the accuracy of each model in real time.

By the end of the experiment you should have one of two candidates that are more promising than others.

## Final notes

You should probably expose your services such as Tensorboard and Tensorflow Serving with an ingress manifest rather than using the port forwarding functionality in `kube-proxy`.

The NFS volume is running on a single instance and isn't highly available. Having a single node for your storage may work if you run small workloads, but you should probably investigate [Ceph](http://docs.ceph.com/docs/mimic/cephfs/), [GlusterFS](https://www.gluster.org/) or [rook.io](https://rook.io) as a way to manage distributed storage.

You should consider using [Helm](https://helm.sh/) instead of crafting your own scripts to interpolate yaml files.