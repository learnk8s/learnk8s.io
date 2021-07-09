#! /bin/bash
# Provision AKS Cluster

source variables.sh

set -x

az group create --name ${RESOURCE_GROUP} --location eastus
az aks create \
    --resource-group ${RESOURCE_GROUP} \
    --name ${CLUSTER_NAME} \
    --node-count 2 \
    --enable-addons monitoring \
    --generate-ssh-keys
az aks install-cli
az aks get-credentials --resource-group ${RESOURCE_GROUP} --name ${CLUSTER_NAME}
kubectl get nodes

