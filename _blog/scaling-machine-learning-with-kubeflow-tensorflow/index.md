---
layout: post
title: Scaling Machine Learning in the Cloud with Kubernetes
open_graph:
  title: Contact us
  description: Get in touch and let us know how we can help.
  type: business.business
  image: /assets/open_graph_preview.png
---

Gathering facts and data to better understand the world we live has become the new norm.

From self-driving cars to smart personal assistants, data and data science is everywhere.

Even the phones that we carry in our pockets now feature dedicated units for machine learning.

In fact, there has never been more need for more performant and efficient system to ingest and extract meanings out of large volumes of numbers.

The challenges for data scientists and engineers is how to design pipelines and processes that can operate at scale and in real-time.

Traditionally, the setup of the services and tools required for effective development and deployment of deep learning model has been time consuming and error prone.

## Build once, run ~~everywhere~~ on my machine

Being able to run your models locally and reproduce the same results in the data farm is what you should expect.

But it's not always like this.

And the issues is not new to any kind of software development either.

You write an algorithm on your computer and test it by training it locally to produce a model.

It works well and you are proud of your work.

But when you send it to the data farm or your colleague tries to run it, it fails.

It's only after carring out extensive checks that you realise that there is a conflict of runtime version — your colleague is still stuck at Python 2.7!

It would be much easier if you could send your models alongside your environment and settings.

You could truly have reproducible results indepedently from when you run your tests.

Particularly when you need a larger computer to process even more data.

## When your computer is not enough

There comes a point while developing models that the computer you are using will not be enough to train your model.

Sure, you could buy a powerful gaming PC and stuff it with video cards.

However, you will have to wait for it to be delivered and set it all up with the required pre-requsistes.

And if you are working in a team and they all require the same setup, buying a powerful machine for each of the members will not be financially viable.

You won't have a good return of investment when you go on holiday.

The kit stays under your desk and collects dust.

A better strategy would be to rent the kit only when you need it.

So you can pay only for what you use.

Perhaps you could use a workstation in the cloud, so that even your colleagues can provision large clusters when and if they needed.

## The whole setup is too complex

Provisioning clusters in the cloud, designing the infrastructure to ingest and extract miningful data, researching and training models.

As a data scientist your expertise and duties span several disciplines.

The expectation of a data scientist is that you will focus on a handful of things such as writing an algorithm, training the model, testing and evaluating the outcome of the model.

![Data Science Expectations]({% link _blog/scaling-machine-learning-with-kubeflow-tensorflow/datascience_expectation.png %})

The reality however is very sobering.

You have to deal with a myriad of things.

From setting up the infrastructure that can serve the required models, to configuring monitoring tools, tuning resource management, supporting batched jobs and the list goes on!

![Data Science Reality]({% link _blog/scaling-machine-learning-with-kubeflow-tensorflow/datascience_reality.png %})

In order to become a data scientist, one has to quickly grasp and specialise other aspects of software development, operations and infrastructure management.

Even if you don't want to, unfortunately.

## Scaling machine learning in the cloud

_But what if you could outsource all of the non data science to someone else while still retaining control?_

_What if you could leverage an existing platform for scaling your models without having to reinvent the wheel?_

_What if you could train and evaluate your model in the cloud as you do locally?_

You could finally focus on what you do best: the data science!

There're few competing solutions that provide an easy entry to a data farm.

You might have heard of:

- [Google Cloud Machine Learning](https://cloud.google.com/ml-engine/)
- [Machine learning on AWS](https://aws.amazon.com/machine-learning/)
- [Scale](https://www.scaleapi.com/) the API for training data

They are all valid solutions, but they tend to run in public clouds and you can't easily move to another once you committed to one.

## Kubeflow — an open source machine learning platform

An excellent alternative for training and evaluating your models in public and private clouds is to use [Kubeflow](https://github.com/kubeflow/kubeflow) — an open source toolkit to distribute machine learning.

Kubeflow is designed to make your machine learning experiments portable and scalable.

You start by creating Jupyter notebooks in the cloud.

Since you can rent kit by the hours, you can run your experiment on large compute resources with dedicated hardware such as GPUs and TPUs.

When you sense that you have hit a breakthrough, you can scale your model to run on thousand of machines.

Kubeflow optimise your work into smaller tasks that can be processes in parallel.

Then, it distributes the tasks to several computers and waits to collect the results.

You can easily rent kit to run thousands of nodes and train your model an order of magnitude quicker than you're used to!

When the results are collected, you can use Kubeflow built-in webserver to offer an API to query the model.

No need to create your own webserver and plug in the algorithm. Kubeflow offers that out of the box.

But things gets even better.

Kubeflow can run parametrised jobs.

That's great news if you need to tune your hyperparameters.

Instead of starting a single job and having it broken down to smaller tasks, you can submit several jobs and let Kubeflow optimise the processing for you.

And while you wait, you can observe the progress of each model on the built-in dashboard.

Let me recap what Kubeflow does for you:

- deploys a JupyterHub where you can start notebooks with beefy machines
- breaks down your models into smaller tasks that can be parallelised
- serves your models as an API to be queries by other services
- can run parametrised jobs in parallel — ideal for hyperparameter sweeping

Exciting!

All the annoying tasks that were not data science are just removed from the equation.

You can finally focus on what you know best: the data science!

_So how do you get started with Kubeflow?_

There are two components that make scaling deep learning possible in Kubeflow: Kubernetes and Tensorflow.

## What's Kubernetes?

Kubernetes is a smart scheduler for your infrastructure.

It can distribute tasks across multiple nodes and monitor them for completion.

It can also do other things such as automatically adding more nodes as you run out of resources.

In fact, it's good sense to start your cluster with a single computer and let Kubernetes add more as more jobs are submitted.

_But what's so special about Kubernetes?_

Kubernetes is cloud provider independent.

You can install Kubernetes on Amazon Web Services, Azure or your private cloud.

If you decide to move to another cloud, you can install Kubernetes and continue using the same resources and code.

But Kubernetes doesn't know how to do machine learning.

It can only speak infrastructure.

_So how can you train model with it?_

## Tensorflow

Kubeflow uses Tensorflow to break down your models into smaller tasks that can be parallilised using Kubernetes.

> Tensorflow is one of the framework you could use to scale your models. The team behind Kubeflow has plan to add more frameworks such a PyTorch, MXNet and Chainer.

Please note that you should write your model in Tensorflow (or Keras) to begin with.

Kubeflow cannot parallilise your work if you use vanilla Python of scikit.

You should also pay attention to the Tensorflow API that you use.

TensorFlow exposes three different kinds of APIs: low, mid and high level APIs.

![TensorFlow programming stack]({% link _blog/scaling-machine-learning-with-kubeflow-tensorflow/tensorflow_programming_environment.png %})

When you use the high level APIs such as the [Estimators API](https://www.TensorFlow.org/programmers_guide/estimators) you benefit from:

- an easier and more human friendly API
- Estimators take care of abstracting the underlying resources from you

The latter benefit is exactly what you need to test and train your model locally with a subset of the data and then move to the cloud with a much larger dataset and a more powerful cluster.

If you use the estimator API you don't need to rewrite the code to run in the cloud.

The second detail you should pay attention to is the method you use to train your model.

The only method that works locally and in distributed TensorFlow is `tf.estimator.train_and_evaluate` from the [Estimators API](https://www.TensorFlow.org/api_docs/python/tf/estimator/train_and_evaluate).

Tensorflow offers the same method as two separate command: `train` and `evaluate`.

But they only work locally and not when you deploy in the cloud.

At learnk8s we made notes of the other API you should use to write scalable models.

If you pay attention the previous steps, you have a model that works in a Jupyter notebook, locally and in the cloud.

And in combination with Kubernetes you scale it to thousands of computer.

_Once the model is trained at scale, what do you do with it?_

## Tensorflow serving

You can expose your model as an API without writing any code.

As long as you use Tensorflow to write your model and export the results, you can leverage Tensorflow serving to read the data and start serving predictions.

Tensorflow serving can be deployed as a web server in Kubernetes thanks to Kubeflow.

Which means that you can use the same Kubernetes primitives to scale your API server to handle more calls.

You don't have to look after the infrastructure yourself anymore.

The setup is great if you need to train and serve one model.

_But what if you wish to tune the parameters and train several models at the same time and offer a versioned API for each of them?_

## Rinse and repeat: hyperparameter sweeping

The jobs that are submitted to Kubernetes can parametrised.

So what if you parametrised the hyperparameters and produce multiple results for the same model?

You could explore more variations of your model.

And you'll have a lot of data which you could use to serve an API.

_But how do you make sense of it?_

You could visualise the detail of your distributed TensorFlow jobs with [Tensorboard](https://www.TensorFlow.org/programmers_guide/summaries_and_tensorboard) — a dashboard that makes it easier to understand, debug, and optimize TensorFlow programs.

Tensorboard is particularly when you wish to monitor and optimise your models for parameter sweeping.

With an eye glance you can tell which parameters are performing better and where you should focus your attention.

## Summary

Kubeflow, Kubernetes and Tensorflow are an excellent toolbox to design, train and scale machine learning models.

With Kubernetes you can off load most of the infrastructure heavy operations such as scaling and provisioning.

Tensorflow has an efficient collection of tools that are neatly designed to work in concert.

And finally Kubeflow is the glue that makes it possible to leverage the best of both worlds.