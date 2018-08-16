# Research, Document and Publish an article on running a K8s cluster on Pi devices.

__Research phase:__

- [x] Set up a proposed BOM.

- [x] Get it approved.

- [x] Acquire the materials as per BOM.

>>Please note that I ended up purchasing one 16GB MicroSD card and two 32GB MicroSD cards.
Because I want to make sure that the Master Node (MN1) can run on 16GB, I will use the 16GB card for MN1 and the two 32GB cards for he worker nodes (WN1 & WN2).

- [ ] Document initial technical strategy for installing and managing the K8s cluster.
  - [ ] 2 Pi devices as Nodes.
  - [ ] 1 Pi device as Master.

- [ ] Start development and refactor documentation as I go along.

- [ ] Refactor the actual deployment strategy and resources (such as config files)

- [ ] Finalise the research phase:
  - [ ] Code repos for configurations.
  - [ ] Documentation.

__Article Preparation:__

- [ ] Set up tasks as per writing checklist.

## Documentation

This section outlines all the technical steps I am taking to install K8s on the RPi devices so that I can refer to it when typing the article.

### Setting the Hardware

After unpacking the devices, I connected the fans and fitted the RPi devices into the cases. I connected the RPi devices to the power banks (due to power cuts). Once I've turned on each RPi device, I can confirm that the red LED light is working.

At this stage, the result is that I have 3 Raspberry Pi 3 model B devices capable of being powered on.

- [ ] Label the RPi devices
  - [ ] One device __MN1__ which stands for Master Node One.
  - [ ] One device __WN1__ which stands for Worker Node One.
  - [ ] One device __MN2__ which stands for Worker Node Two.

- [x] Cannot label the MicroSD cards as otherwise they won't fit in the reader slot. However:
  - [ ] MN1 will use a 16GB Samsung microSDHC Card.
  - [ ] WN1 will use a 32GB Samsung microSDHC Card.
  - [ ] WN2 will use a 32GB Samsung microSDHC Card.

- [ ] Label any cables and their power switches for ease of maintenance.


### Installing Software Dependencies

I decided to not install NOOBS on the SD cards so that I can install each dependency separately.

#### Installing an Operating System

I decided to first try using the Raspbian Lite (Stretch) a minimal image based on Debian Stretch.

- [x] Download the OS from the [official website](https://www.raspberrypi.org/downloads/raspbian/)

I decided to use [Etcher](https://etcher.io) to flash the SD cards because it is safer for everyone to use, avoiding flashing the wrong drive and minimising the list of commands to type.

- [x] Download and Install [Etcher](https://etcher.io)
> On MAC, you can simply run `brew cask install etcher`.

__ For each MicroSD Card:__

- [x] Open Etcher, select the Raspian image, double check the correct drive and click Flash.
- [x] Once ready, enable `headless start` by placing a file named `ssh` without any extension into the boot partition of the SD card. Simply use a terminal, navigate to your drive such as `cd /f` and `touch ssh`.
> In Windows, I found that the best way to do this is to create a file named `ssh` anywhere on the PC and then copy and paste it from the GUI because of write access issues. You can probably also use `Command Prompt` as an Administrator.

- [x] With all the RPi devices powered OFF, insert the newly flashed SD cards.

While booting the RPi devices, you should start seeing a blinking green LED(s) notifying you that the device is reading from the SD card.


### Setting up a Network with Internet

### Installing Docker

### Installing Kubernetes

### Running Kubernetes

Master & Worker Nodes.

## Results

- [ ] I have Kubernetes installed and running on 3 RPi devices:
  - [ ] One Master Node (MN1)
  - [ ] Two Worker Nodes (WN1) & (WN2)

- [ ] I can run an application (POD) on WN1

- [ ] I can replicate the application (POD) on WN2

- [ ] I can see the two running Pods from MN1

- [ ] Check available memory?

- [ ] Check available storage space?