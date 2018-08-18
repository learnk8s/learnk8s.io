---
layout: post
title: 3 simple tricks for smaller Docker images
description: When it comes to building Docker containers, you should always strive for smaller images. Images that share layers and are smaller in size are quicker to transfer and deploy. But how do you keep the size under control when every RUN statement creates a new layer, and you need intermediate artefacts before the image is ready?
date: 2018-02-12 11:26:00
categories: docker distroless alpine node.js
image: /blog/smaller-docker-images/smaller_images.png
js:
  - anime.min.js
  - isScrolledIntoView.js
open_graph:
  type: article
  title: 3 simple tricks for smaller Docker images
  image: /blog/smaller-docker-images/smaller_images.png
  description: When it comes to building Docker containers, you should always strive for smaller images. Images that share layers and are smaller in size are quicker to transfer and deploy. But how do you keep the size under control when every RUN statement creates a new layer, and you need intermediate artefacts before the image is ready?
---

When it comes to building Docker containers, you should always strive for smaller images. **Images that share layers and are smaller in size are quicker to transfer and deploy**.

But how do you keep the size under control when every `RUN` statement creates a new layer, and you need intermediate artefacts before the image is ready?

<!--more-->

You may have noticed that most of the `Dockerfile`s in the wild have some weird tricks like this:

```dockerfile
FROM ubuntu

RUN apt-get update && apt-get install vim
```

Why the `&&`? Why not running two `RUN` statements like this?

```dockerfile
FROM ubuntu

RUN apt-get update
RUN apt-get install vim
```

Since docker 1.10 the `COPY`, `ADD` and `RUN` statements add a new layer to your image. The previous example created two layers instead of just one.

{% include_relative layers.html %}

**Layers are like git commits.**

{% include tweet_this/index.html content="Docker layers store the difference between the previous and the current version of the image. And like git commits they're handy if you share them with other repositories or images." %}

In fact, when you request an image from a registry you download only the layers that you don't own already. This way is much more efficient to share images.

But layers aren't free.

**Layers use space** and the more layer you have, the heavier the final image is. Git repositories are similar in this respect. The size of your repository increases with the number of layers because Git has to store all the changes between commits.

In the past, it was a good practice to combine several `RUN` statements on a single line. Like in the first example.

Not anymore.

## 1. Squash multiple layers into one with multi-stage Docker builds

When a Git repository becomes bigger, you can choose to squash the history into a single commit and forget about the past.

It turns out you can do something similar in Docker too with a multi-stage build.

In this example, you will build a Node.js container.

Let's start with an `index.js`:

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => {
  console.log(`Example app listening on port 3000!`)
})
```

and `package.json`:

```json
{
  "name": "hello-world",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "express": "^4.16.2"
  },
  "scripts": {
    "start": "node index.js"
  }
}
```

You can package this application with the following `Dockerfile`:

```dockerfile
FROM node:8

EXPOSE 3000
WORKDIR /app
COPY package.json index.js ./
RUN npm install

CMD ["npm", "start"]
```

You can build the image with:

```bash
$ docker build -t node-vanilla .
```

And you can test that it works correctly with:

```bash
$ docker run -p 3000:3000 -ti --rm --init node-vanilla

> hello-world@1.0.0 start /app
> node index.js

Example app listening on port 3000!
```

You should be able to visit [http://localhost:3000](http://localhost:3000) and be greeted by _"Hello World!"_.

There is a `COPY` and a `RUN` statements in the `Dockerfile`. So you should expect to see at least two layers more than the base image:

```bash
$ docker history node-vanilla
IMAGE          CREATED BY                                      SIZE
075d229d3f48   /bin/sh -c #(nop)  CMD ["npm" "start"]          0B
bc8c3cc813ae   /bin/sh -c npm install                          2.91MB
bac31afb6f42   /bin/sh -c #(nop) COPY multi:3071ddd474429e1…   364B
500a9fbef90e   /bin/sh -c #(nop) WORKDIR /app                  0B
78b28027dfbf   /bin/sh -c #(nop)  EXPOSE 3000                  0B
b87c2ad8344d   /bin/sh -c #(nop)  CMD ["node"]                 0B
<missing>      /bin/sh -c set -ex   && for key in     6A010…   4.17MB
<missing>      /bin/sh -c #(nop)  ENV YARN_VERSION=1.3.2       0B
<missing>      /bin/sh -c ARCH= && dpkgArch="$(dpkg --print…   56.9MB
<missing>      /bin/sh -c #(nop)  ENV NODE_VERSION=8.9.4       0B
<missing>      /bin/sh -c set -ex   && for key in     94AE3…   129kB
<missing>      /bin/sh -c groupadd --gid 1000 node   && use…   335kB
<missing>      /bin/sh -c set -ex;  apt-get update;  apt-ge…   324MB
<missing>      /bin/sh -c apt-get update && apt-get install…   123MB
<missing>      /bin/sh -c set -ex;  if ! command -v gpg > /…   0B
<missing>      /bin/sh -c apt-get update && apt-get install…   44.6MB
<missing>      /bin/sh -c #(nop)  CMD ["bash"]                 0B
<missing>      /bin/sh -c #(nop) ADD file:1dd78a123212328bd…   123MB
```

Instead the resulting image has five new layers: one for each statement in your `Dockerfile`.

Let's try the multi-stage Docker build.

You will use the same `Dockerfile` above, but twice:

```dockerfile
FROM node:8 as build

WORKDIR /app
COPY package.json index.js ./
RUN npm install

FROM node:8

COPY --from=build /app /
EXPOSE 3000
CMD ["index.js"]
```

The first part of the `Dockerfile` creates three layers. The layers are then merged and copied across to the second and final stage. Two more layers are added on top of the image for a total of 3 layers.

{% include_relative multistage.html %}

Go ahead and verify yourself. First, build the container:

```bash
$ docker build -t node-multi-stage .
```

And now inspect the history:

```bash
$ docker history node-multi-stage
IMAGE          CREATED BY                                      SIZE
331b81a245b1   /bin/sh -c #(nop)  CMD ["index.js"]             0B
bdfc932314af   /bin/sh -c #(nop)  EXPOSE 3000                  0B
f8992f6c62a6   /bin/sh -c #(nop) COPY dir:e2b57dff89be62f77…   1.62MB
b87c2ad8344d   /bin/sh -c #(nop)  CMD ["node"]                 0B
<missing>      /bin/sh -c set -ex   && for key in     6A010…   4.17MB
<missing>      /bin/sh -c #(nop)  ENV YARN_VERSION=1.3.2       0B
<missing>      /bin/sh -c ARCH= && dpkgArch="$(dpkg --print…   56.9MB
<missing>      /bin/sh -c #(nop)  ENV NODE_VERSION=8.9.4       0B
<missing>      /bin/sh -c set -ex   && for key in     94AE3…   129kB
<missing>      /bin/sh -c groupadd --gid 1000 node   && use…   335kB
<missing>      /bin/sh -c set -ex;  apt-get update;  apt-ge…   324MB
<missing>      /bin/sh -c apt-get update && apt-get install…   123MB
<missing>      /bin/sh -c set -ex;  if ! command -v gpg > /…   0B
<missing>      /bin/sh -c apt-get update && apt-get install…   44.6MB
<missing>      /bin/sh -c #(nop)  CMD ["bash"]                 0B
<missing>      /bin/sh -c #(nop) ADD file:1dd78a123212328bd…   123MB
```

Hurrah! Has the file size changed at all?

```bash
$ docker images | grep node-
node-multi-stage   331b81a245b1   678MB
node-vanilla       075d229d3f48   679MB
```

Yes, the last image is slightly smaller.

Not too bad! You reduced the overall size even if this is an already slimmed down application.

But the image is still big!

Is there anything you can do to make it even smaller?

{% include inline-subscribe-cta/index.html %}

## 2. Remove all the unnecessary cruft from the container with distroless

The current image ships Node.js as well as `yarn`, `npm`, `bash` and a lot of other binaries. It's also based on Ubuntu. So you have a fully fledged operating system with all its little binaries and utilities.

You don't need any of those when you run your container. The only dependency you need is Node.js.

{% include tweet_this/index.html content="Docker containers should wrap a single process and contain the bare minimal to run it. You don't need an operating system." %}

In fact, you could remove everything but Node.js.

**But how?**

Fortunately, Google had the same idea and came up with [GoogleCloudPlatform/distroless](https://github.com/GoogleCloudPlatform/distroless).

As the description for the repository points out:

> "Distroless" images contain only your application and its runtime dependencies. They do not contain package managers, shells any other programs you would expect to find in a standard Linux distribution.

This is precisely what you need!

You can tweak the `Dockerfile` to leverage the new base image like this:

```dockerfile
FROM node:8 as build

WORKDIR /app
COPY package.json index.js ./
RUN npm install

FROM gcr.io/distroless/nodejs

COPY --from=build /app /
EXPOSE 3000
CMD ["index.js"]
```

And you can compile the image as usual with:

```bash
$ docker build -t node-distroless .
```

The application should run as normal. To verify that is still the case, you could run the container like this:

```bash
$ docker run -p 3000:3000 -ti --rm --init node-distroless
```

And visit the page at [http://localhost:3000](http://localhost:3000).

Is the image without all the extra binaries smaller?

```bash
$ docker images | grep node-distroless
node-distroless   7b4db3b7f1e5   76.7MB
```

**That's only 76.7MB!**

600MB less than your previous image!

Excellent news! But there's something you should pay attention to when it comes to distroless.

When your container is running, and you wish to inspect it, you can attach to a running container with:

```bash
$ docker exec -ti <insert_docker_id> bash
```

Attaching to a running container and running `bash` feels like establishing an SSH session.

But since distroless is a stripped down version of the original operating system, there are no extra binaries. There's no shell in the container!

How can you attach to a running container if there's no shell?

The good and the bad news is that you can't.

It's bad news because you can only execute the binaries in the container. The only binary you could run is Node.js:

```bash
$ docker exec -ti <insert_docker_id> node
```

It's good news because an attacker exploiting your application and gaining access to the container won't be able to do as much damage as if were to access a shell. In other words, fewer binaries mean smaller sizes and increased security. But at the cost of more painful debugging.

> Please note that perhaps you shouldn't attach to and debug containers in a production environment. You should rather rely on proper logging and monitoring.

But what if you cared about debugging and smaller sizes?

## 3. Smaller base images with Alpine

You could replace the distroless base image with an Alpine based image.

[Alpine Linux](https://alpinelinux.org/) is:

> a security-oriented, lightweight Linux distribution based on [musl libc](https://www.musl-libc.org/) and [busybox](https://www.busybox.net/)

In other words, a Linux distribution that is smaller in size and more secure.

You shouldn't take their words for granted. Let's check if the image is smaller.

You should tweak the `Dockerfile` and use `node:8-alpine`:

```dockerfile
FROM node:8 as build

WORKDIR /app
COPY package.json index.js ./
RUN npm install

FROM node:8-alpine

COPY --from=build /app /
EXPOSE 3000
CMD ["npm", "start"]
```

You can build the image with:

```bash
$ docker build -t node-alpine .
```

And you can check the size with:

```bash
$ docker images | grep node-alpine
node-alpine   aa1f85f8e724   69.7MB
```

**69.7MB!**

Even smaller than the distroless image!

Can you attach to a running container, unlike distroless? It's time to find out.

Let's start the container first:

```bash
$ docker run -p 3000:3000 -ti --rm --init node-alpine
Example app listening on port 3000!
```

You can attach to the running container with:

```bash
$ docker exec -ti 9d8e97e307d7 bash
OCI runtime exec failed: exec failed: container_linux.go:296: starting container process caused "exec: \"bash\": executable file not found in $PATH": unknown
```

With no luck. But perhaps the container has a `sh`ell?

```bash
$ docker exec -ti 9d8e97e307d7 sh
/ #
```

Yes! You can still attach to a running container and you have an overall smaller image.

It sounds promising, but there's a catch.

Alpine based images are based on muslc — an alternative standard library for C.

However, most Linux distribution such as Ubuntu, Debian and CentOS are based on glibc. The two libraries are supposed to implement the same interface to the kernel.

However, they have different goals:

- **glibc** is the most common and faster
- **muslc** uses less space and is written with security in mind

When an application is compiled, it is compiled against a specific libc for the most part. If you wish to use them with another libc you have to recompile them.

In other words, building your containers with Alpine images may lead to unexpected behaviour because the standard C library is different.

You may notice discrepancies particularly when you're dealing with precompiled binaries such as Node.js C++ extensions.

As an example, the PhantomJS prebuilt package doesn't work on Alpine.

## What base image should you choose?

Do you use Alpine, distroless or vanilla images?

**If you're running in production and you're concerned about security**, perhaps distroless images are more appropriate.

Every binary that is added to a Docker image adds a certain amount of risk to the overall application.

You can reduce the overall risk by having only one binary installed in the container.

As an example, if an attacker was able to exploit a vulnerability in your app running on Distroless, they won't be able to spawn a shell in the container because there isn't one!

> Please note that [minimising attack surface area is recommended by OWASP](https://www.owasp.org/index.php/Minimize_attack_surface_area).

**If you're concerned about size at all costs, then you should switch to Alpine based images**.

Those are generally very small but at the price of compatibility. Alpine uses a slightly different standard C library — muslc. You may experience some compatibility issues from time to time. More examples of that [here](https://github.com/grpc/grpc/issues/8528) and [here](https://github.com/grpc/grpc/issues/6126).

**The vanilla base image is perfect for testing and development**.

It's big but provides the same experiences as if you were to have your workstation with Ubuntu installed. Also, you have access to all the binaries available in the operating system.

Recap of image sizes:

| Image | Size (MB) |
|-|-|
| `node:8` | 681 |
| `node:8` with multi stage build | 678 |
| `gcr.io/distroless/nodejs` | 76.7 |
| `node:8-alpine` | 69.7 |

## That's all folks!

Thanks to [Chris Nesbitt-Smith](https://github.com/chrisns), [Valentin Ouvrard](https://valentin.ouvrard.it/) and [Keith Mifsud](https://keith-mifsud.me/) for their feedback!

If you enjoyed this article, you might find interesting reading:

- [Getting started with Docker and Kubernetes on Windows 10](https://learnk8s.io/blog/installing-docker-and-kubernetes-on-windows) where you'll get your hands dirty and install Docker and Kubernetes in your Windows environment.
- [Kubernetes Chaos Engineering: Lessons Learned — Part 1](https://learnk8s.io/blog/kubernetes-chaos-engineering-lessons-learned) what happens when things go wrong in Kubernetes?

## Become an expert at deploying and scaling applications in Kubernetes

Dealing with one container at the time is easy, but what happens when you have thousands of containers to build, deploy and monitor?

Kubernetes is the de facto container orchestrator and helps you to manage Docker containers with ease.

Get a head start with our hands-on courses and learn how to master scalability in the cloud.

Learn how to:

{% include promo-workshop/index.html %}

P.S. Don't miss the next experiment, insight, or *discount*: [subscribe to the mailing list!](/newsletter)