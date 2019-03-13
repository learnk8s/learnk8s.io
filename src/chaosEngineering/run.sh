#!/bin/bash

# create a cluster in GCE
gcloud container clusters create test-cluster --machine-type=n1-standard-1 --num-nodes=2

# setup kubectl
gcloud container clusters get-credentials test-cluster

# verify that kubectl can connect to the cluster
kubectl cluster-info

# list all the nodes and their IP addresses
kubectl get no -o wide

# create deployment and service
kubectl create -f deployment.yaml
kubectl create -f service.yaml

# poke a hole in the firewall
gcloud compute firewall-rules create myservice --allow tcp:30000

# list compute instances
gcloud compute instances list

# ssh into a compute instance
gcloud compute ssh gke-test-cluster-default-pool-3713d8c4-49v5 --zone europe-west1-d

# remove firewall rule
gcloud compute firewall-rules delete myservice

# delete cluster
gcloud container clusters delete test-cluster