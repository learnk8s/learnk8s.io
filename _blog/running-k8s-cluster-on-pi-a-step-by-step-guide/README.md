# Research, Document and Publish an article on running a K8s cluster on Pi devices.

__Research phase:__

- [ ] Set up a proposed BOM.

- [ ] Get it approved.

- [ ] Acquire the materials as per BOM.

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

### Installing Software Dependencies

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