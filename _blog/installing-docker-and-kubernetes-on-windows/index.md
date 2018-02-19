---
layout: post
title: Installing Docker and Kubernetes on Windows
description: ""
date: 2018-02-19 02:00:00
categories: docker kubernetes windows

author: "Keith Mifsud"
open_graph:
  type: article
  title: Installing Docker and Kubernetes on Windows
  image: ""
  description: "In this article, you will learn how to install Docker on Windows and how to install the tools needed to run Kubernetes locally. These are Kubectl, the command line interface for Kubernetes and Minikube, a local Kubernetes platform."
---
You work on a Windows workstation. Maybe you use Vagrant as a portable environment for your code development. Now you're working on a new project where the team members are using Docker as a local deployment tool and to share the containers across the DevOps stakeholders. The team also wants to be prepared to deploy the application on Kubernetes because, in production, the application will be served across multiple services. 

You will encounter several issues to install and run Docker on Windows because the Docker Engine daemon uses features specific to the Linux Kernel and you cannot deploy to Kubernetes without a Docker image. So where do you start from? 

In this article, you will learn how to install Docker on Windows and how to install the tools needed to run Kubernetes locally. These are Kubectl, the command line interface for Kubernetes and Minikube, a local Kubernetes platform.

## Installing Docker on Windows

When you look into installing Docker on Windows, you will suddenly realise that it is not as straightforward as installing it on other operating systems. There are two main options for installing and running Docker on Windows, one of which requires Hyper-V to be installed and therefore is not available for Home editions but only for Pro, Enterprise and Education editions. The second option bypasses this requirement by running Docker inside a Linux Virtual Machine.

Docker can be installed on 64bit Windows versions 7 or higher. However, the Docker for Windows requires at least Windows version 10 on a 64bit system with Hyper-V installed. If your system does not meet these requirements then you should use the Docker Toolbox instead. It is also worth noting that even if your system meets the requirements for installing and running Docker for Windows, you cannot run VirtualBox or another type 2 hypervisor virtualization software at the same time. Therefore, if you need to make simultaneous use of VirtualBox or VMWare while running Docker, you should instead opt for the Docker Toolbox.

Installing the Docker for Windows is very straightforward, simply <a href="https://docs.docker.com/docker-for-windows/install/" title="Download the Docker for Windows Installer" target="_blank" rel="noopener">download the installer</a> and run it. Once installed, run the application and it will initialise Docker. After initialisation, you will be able to use docker commands in your preferred terminal.


Installing the Docker Toolbox is also not so trivial. In fact, the only trivial part of installing Docker on Windows is deciding which installer and method to use, as explained above. The toolbox works by running Docker within a Linux virtual machine so it requires VirtualBox to be installed. If you do not already have VirtualBox installed, you can either install it separately by download it from <a href="https://www.virtualbox.org/wiki/Downloads" title="Download VirtualBox" target="_blank" rel="noopener">here</a>, or you can select it as part of the components to install during the Docker Toolbox installation wizard. Download the <a href="https://docs.docker.com/toolbox/toolbox_install_windows/" title="Download the Docker Toolbox" target="_blank" rel="noopener">toolbox</a> and then run the installer. Once the installation wizard starts, you will be prompted to select which components, other than the required ones, to install alongside it. If you already have VirtualBox installed on your system, then make sure you unselect this component from the list provided.
 
Once installed, you can use Docker through the Quick Start Terminal. To verify the installation, open the Quick Start Terminal and once it has initialised, you should see a cool drawing of a whale together with the IP address of the Docker machine.

Irrelevant to which installation method you've used, you can further verify that Docker is fully functional by running the Docker's hello-world example.

```bash
docker run hello-world
```

and you will see a similar output to this:

![Docker Quick Start Terminal]({% link 
_blog/installing-docker-and-kubernetes-on-windows/docker-quick-start-terminal.png %})


## Running K8s on a Windows Workstation

In order to manage a Kubernetes platform from your workstation, you will need to install Kubectl, the command line interface for managing the containers' orchestration. In this example, you will install Kubectl and Minikube so that you can run the containers locally as if you are running them in the cloud. You can find more information on Kubectl, Minikube and also an introduction to Kubernetes in our <a href="/blog/deploying-laravel-to-kubernetes/" title="Deploying Laravel to Kubernetes">previous article</a>.


If done right, running Kubernetes on Windows is as easy as running Docker.
 The most common problems with this are normally due to administrator permissions, the choice of the terminal application to use and the location from where to run the commands from. The following are tried and tested steps to get K8s working on any Windows system supported by the Docker requirements as detailed above.


With Docker already installed, you will need to first <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl/" title="Download Kubectl for Windows" target="_blank" rel="noopener">download the latest stable release of Kubectl</a> for Windows. Once downloaded, move the `.exe` file to the master partition, this is normally the `C:\` directory and make it available in your environment PATH variable.

To download Minikube, <a href="https://github.com/kubernetes/minikube/releases" title="Download Minikube for Windows" target="_blank" rel="noopener">navigate here</a> and choose the
 latest `minikube-installer.exe` file. At the time of writing, Minikube is still an experimental project and the latest version is v0.25.0. Once downloaded, move it to the master partition adjacent to where `kubectl.exe` is located.
 
You have now installed all the required utilities to run Kubernetes on 
Windows. To verify this and also make use of Minikube, you should start PowerShell in administrator mode. When you do so, PowerShell will start at the location of your Windows installation. This is normally `C:\Windows\system32`. Therefore, you will need to change directory to your root partition `C:\`, where the 
`minikube.exe` file is located and to access the Minikube's commands, you must refer to the .exe file, like so:

```bash
.\minikube.exe --help
```

![Minikube on Windows]({% link 
_blog/installing-docker-and-kubernetes-on-windows/minikube-on-windows.png %})


## A step further

So now that you can run K8s on your Windows workstation, why not follow the 
<a href="/blog/deploying-laravel-to-kubernetes" title="Deploying Laravel to 
Kubernetes">Deploying Laravel to Kubernetes</a> tutorial and get a more 
in-depth introduction to Kubernetes? You will notice that in Unix systems 
both `minikube` and `kubectl` commands can be run from anywhere as opposed to
 Windows's requirements were you'll need to specifically refer to the `.exe` 
 files from within the location they reside. Other than that, all is the 
 same, the commands in the tutorial can easily be translated to work on Windows.