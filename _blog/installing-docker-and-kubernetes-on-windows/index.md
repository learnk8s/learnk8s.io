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








---


## Intro

[TODO: Intro]

[TODO: toc]

When it comes to installing Docker on Windows, you have few options.

## Using Windows 10 Home? You won't be able to run Docker for Windows

When the amazing people at Docker decided to implement Docker on Windows, they opted for Hyper-V as their virtualisation technology. The benefit is crystal clear: great performance and a native hypervisor.

**Unfortunately not all Windows versions ship with Hyper-V.**

And if you're using Windows 10 Home or Student edition, you are out of luck. You won't be able to install and run Docker for Windows.

_But worry not!_

That are plenty of replacements based on [Docker Machine](https://docs.docker.com/machine/) such as Docker Toolbox or minikube.

The way Docker Machine works is simple: there's a virtual machine that runs Linux and Docker. And you connect from your host to the remote Docker daemon in that virtual machine.

Minikube is the somehow one of most interesting virtual machine based on Docker Machine — _that's if you're into running Kubernetes clusters._

In fact, minikube is a virtual machine that runs Docker **and** Kubernetes. It's usually used to run Kubernetes only, but you can use it to run Docker containers too.

You won't reach the same speed as Docker for Windows, but you can build and run containers without Hyper-V.

## With Windows 10 Pro, Docker for Windows is the best — until it isn't

You have the latest Windows 10 Pro and you can install Docker for Windows.

Great performance, excellent developer experience. You're sorted, aren't you?

*Maybe.*

The hypervisor used by Docker for Windows is extremely powerful — _indeed it's called a Type-1 hypervisor_.

It's so powerful that it doesn't play nicely with weaker hypervisors such as the one in VirtualBox — _or Type-2 hypervisors_.

You can't have Type-1 and Type-2 hypervisors running at the same time on your machine. Or in other words, if you run Docker for Windows, you won't be able to start your virtual machines on VirtualBox.

Depending on your setup, this may be an insignificant detail.

Perhaps you're fully committed to the containerised world and you left virtual machines behind. An old and distant memory.

But if you're still relying on virtual machines and tools such as Vagrant, perhaps you should be aware of the annoyance.

**You can enable and disable the Hyper-V hypervisor at will, but it requires a restart of your laptop.**

If you're frequently switching from containers to virtual machines, perhaps minikube is a more convenient choice. You don't need to restart your laptop when you switch from containers to virtual machines. But you don't benefit from the extra performance, or the improved experience.

Lastly, if you're interested in running Windows containers — _aka containers with a base image that inherits from Windows_ — Docker for Windows is the only option. And you will need Windows 10 Pro or Enterprise for that.

## Running a local Kubernetes cluster

If you want to run Kubernetes locally, you should consider minikube.

Minikube is a virtual machine running on an embedded Linux Distribution (Buildroot) and comes with the Docker daemon pre-installed.

**It's Kubernetes batteries included.**

Minikube can run its virtual machine on VirtualBox or Hyper-V - [there are more options too](https://github.com/kubernetes/minikube#quickstart).

Which is great news if you already have Hyper-V and want to maintain using the same hypervisor for Docker and minikube.

It's equally good news if you can't run Hyper-V since you can use VirtualBox.

That's a lot of choices and trade-offs, so here's a summary of what was discussed:

![Installing Docker and Kubernetes on Windows]({% link _blog/installing-docker-and-kubernetes-on-windows/diagram.png %})

## 0. Installing the tools to install the tools

You can download and install all the dependencies such as Docker for Windows, Docker Toolbox, VirtualBox, kubectl, Docker CLI, etc. from the official websites, but it's inconvenient.

You have to visit the website, hope that the url is still valid, search for the download page, select the right version, download it, install it and finally add it to your path.

It's doable, but you could rather spend time doing more coding than chasing and installing binaries from the internet.

**Enter Chocolatey.**

[Chocolatey](https://chocolatey.org) is a package manager for Windows. You tell it what binaries you wish to install and Chocolatey installs them on your behalf.

Your handing out all the hard work to someone else.

Installing Chocolatey is easy. You can find the [full instructions on the official website](https://chocolatey.org/install). But in a nutshell this what you have to do:

1. Start `cmd.exe` as administrator
2. Execute this long command:
```powershell
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```
3. Reload `cmd.exe`

If the installation was successful, you can now search for applications to install with:

```powershell
choco search docker
```

Since you're there, you could give `choco` a go. You could install [Cmder](http://cmder.net/) — a modern shell for Windows with:

```powershell
choco install cmder -y
```

The binary was installed in `C:\tools`. If you wish to continue the tutorial using Cmder, you should start the binary as an administrator.

![Cmder — a portable console emulator for Windows]({% link _blog/installing-docker-and-kubernetes-on-windows/cmder.png %})

Looking nice!

## 1. Installing Docker and Kubernetes on Windows 10 Pro

### Installing Docker

You can download Docker for Windows with:

```bash
choco install docker-for-windows -y
```

Restart your laptop. Docker will ask you if you wish to enable Hyper-V.

![Enabling Hyper-V with Docker]({% link _blog/installing-docker-and-kubernetes-on-windows/enable_hyperv.png %})

Yes, you do!

You should be aware that Docker requires VT-X/AMD-v virtual hardware extension to be enabled before you can run any container. Depending on your computer, you may need to reboot and enable it in your BIOS.

If you're unsure about VT-X/AMD-v being enabled, don't worry. If you don't have it, you will be greeted with the following error message:

> Hardware assisted virtualization and data execution protection must be enabled in the BIOS.

![You should enable VT-X/AMD-v]({% link _blog/installing-docker-and-kubernetes-on-windows/vtx_amdv.png %})

Another common error has to do with the Hyper-V hypervisor not being enabled. If you experience this error:

> Unable to start: The running command stopped because the preference variable "ErrorActionPreference" or common parameter is set to Stop: 'MobyLinuxVM' failed to start.
> Failed to start the virtual machine 'MobyLinuxVM' because one of the Hyper-V components is not running.

![You should enable Hyper-V with Docker for Windows]({% link _blog/installing-docker-and-kubernetes-on-windows/hyperv_not_running.png %})

You should enable Hyper-V. Open a new command prompt as an administrator and type the following:

```bash
bcdedit /set hypervisorlaunchtype auto
```

You should reboot your machine and Docker should finally start.

_But how do you know if Docker is working?_

Open a new command prompt and type:

```bash
docker ps
```

If everything works as expected, you should see an empty list of containers running.

If your Docker daemon isn't running, you're probably banging your head against this error:

> error during connect: Get http://%2F%2F.%2Fpipe%2Fdocker_engine/v1.37/containers/json: open //./pipe/docker_engine: The system cannot find the file specified. In the default daemon configuration on Windows, the docker client must be run elevated to connect. This error may also indicate that the docker daemon is not running.

![Docker daemon failed to start]({% link _blog/installing-docker-and-kubernetes-on-windows/docker_error_connection.png %})

The error above is suggesting that your Docker installation is not behaving normally and wasn't able to start.

You should start your Docker daemon before you connect to it.

### Installing Minikube on Hyper-V

You can download minikube with:

```bash
choco install minikube -y
```

Before you start the cluster, you should create an external network switch in Hyper-V Manager.

You can follow this instructions to create a networking switch in Hyper-V Manager:

1. Open Hyper-V Manager
2. From the left column select your computer
3. From the right sideebar select _Virtual Switch Manager_
4. Create a new External Switch
5. Name it "minikube" (without the quotes)
6. Apply your changes

{% include_relative switch.html %}

If you fail to create the network switch, you will see the following error when you start minikube:

> E0427 09:06:16.000298    3252 start.go:159] Error starting host: Error creating host: Error executing step: Running precreate checks.
> no External vswitch found. A valid vswitch must be available for this command to run. Check https://docs.docker.com/machine/drivers/hyper-v/.

You can test your minikube installation with:

```bash
minikube start --vm-driver=hyperv --memory=2048
```

> Please note that `--vm-driver=hyperv --memory=2048` are necessary only for the first start. If you wish to change the driver or the memory you have to `minikube destroy` and recreate the VM with the new settings.

If for any reason minikube fails to start up, you can debug it with:

```bash
minikube delete
minikube start --vm-driver=hyperv --memory=2048 --v=7 --alsologtostderr
```

The extra verbose logging should help you get to the issue. In my particular case, minikube used to fail with:

> E0427 09:19:10.114873   10012 start.go:159] Error starting host: Error starting stopped host: exit status 1.

Not very helpful. After enabling verbose logging the issue was more obvious:

```text
+ Hyper-V\Start-VM minikube
+ ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : FromStdErr: (:) [Start-VM], VirtualizationException
    + FullyQualifiedErrorId : OutOfMemory,Microsoft.HyperV.PowerShell.Commands.StartVM
```

I was running out of memory!

It's time to test if you're installation is successful. In the command prompt type:

```bash
kubectl get nodes
```

You should be able to see a single node in Kubernetes.

### Running virtual machines on VirtualBox

Since Hyper-V is now enabled on your device, you won't be able to start any VM on VirtualBox. You can still try and launch your VM. You may experience the following error, though:

> Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart it for you.

![Blue screen of death]({% link _blog/installing-docker-and-kubernetes-on-windows/bsod.png %})

**If you wish to use VirtualBox or any other executable that uses a Type-2 hypervisor, you should disable it and restart your computer first.**

Open a new command prompt as an administrator and type the following:

```bash
bcdedit /set hypervisorlaunchtype off
```

After restarting your device, you should be able to use VirtualBox as usual.

If you wish to use Docker and minikube again, you should enable Hyper-V and restart your machine.

Open a new command prompt as an administrator and type the following:

```bash
bcdedit /set hypervisorlaunchtype auto
```

Restart and now you're ready to run and deploy containers to Kubernetes!

[Jump to the testing your Docker installation](#testing-your-docker-installation)

## 2. Installing Docker and Kubernetes on Windows 10 Home

If you're planning on using Docker and Kubernetes locally, you can probably save yourself from installing tools such as Docker Toolbox. You can just use minikube as a remote Docker daemon as well as your local Kubernetes cluster.

You can download and install minikube with:

```bash
choco install minikube -y
```

At the end of the installation, you can start minikube with:

```bash
minikube start
```

The command will download an ISO for VirtualBox and start the virtual machine. Once started, you should be able to query the Kubernetes cluster with:

```bash
kubectl get nodes
```

And see a single node.

To connect to the remote Docker daemon, you should install the Docker client with:

```bash
choco install docker -y
```

You can connect to the minikube remote Docker daemon with:

```bash
@FOR /f "tokens=*" %i IN ('minikube docker-env') DO @%i
```

> Please note that you should type the above command every time you open a new terminal. A shorter way to remind yourself about that command is to type `minikube docker-env`.

If the connection was successful, you should be able to list all the running containers with:

```bash
docker ps
```

You should see a lot of running containers. Most of those belong to Kubernetes.

At this point, you're ready. But before you move on, you should be aware of some the limits of using minikube as your remote Docker daemon.

Docker is made of two components:

- the Docker daemon. You can think about it as a server with an API. You can send commands to the API and Docker will receive and execute the commands on your behalf.
- the Docker CLI. The executable that used to send the command to the Docker daemon API

Most of the time you're interacting with the Docker CLI and you don't really see the Docker daemon. So why having a client and a server? Why not having a single binary?

It all comes down to flexiblity.

When you run Docker for Windows, you Docker CLI is connected to your local Docker daemon.

[TODO: pict]

But sometimes you don't have a Docker daemon. Perhaps you want to build containers on a remote machine. Perhaps you can't run Hyper-V on your machine and your Docker daemon is installed in a virtual machine in VirtualBox.
This is the exactly the case if you're running Docker Toolbox.
Your Docker CLI is connected remotely to a Docker daemon that is located inside the minikube virtual machine.

[TODO: pict]

When you're running containers against a remote Docker daemon, you need to adjust your port bindings.

In Docker for Windows, you can run a container that exposes port 80 and bind it on port 8080 on your localhost with the following command:

```bash
docker run -ti -p 8080:80 nginx
```

You can visit [http://localhost:8080](http://localhost:8080) and see the _"Welcome to Nginx"_ page.

If you run the same command using the remote Docker daemon and visit the same page, you won't see anything. The URL is unreachable. So, what's different?

The Docker daemon is in charge of running the containers and forwarding ports. With Docker for Windows the daemon runs locally — on your localhost. So you can just visit the running container on localhost.

Minikube, on the other hand, runs a remote Docker daemon. You need to visit the machine with the Docker daemon if you wish to see your running container. You can find the IP address of the virtual machine that runs Docker toolbox with:

```bash
minikube ip
```

You can visit http://<your minikube ip>:8080 and see the _"Welcome to Nginx"_ page.

## Testing your Docker installation

A better test is to run Wordpress as a Docker container. In your command prompt type:

```bash
docker run -ti -p 8080:80 wordpress
```

Once Docker has completed downloading all the package, you should visit [http://localhost:8080/](http://localhost:8080/). You should be able to see the Wordpress installation Wizard.

> Please note that you won't be able to complete the Wordpress installation because there's no database.


## Testing your Kubernetes cluster installation

### Deployment

### Service

### Dashboard

## Summary