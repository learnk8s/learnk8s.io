#! /bin/bash

source variables.sh

az group delete --name ${RESOURCE_GROUP} --yes --no-wait
kubectl config unset contexts.${CLUSTER_NAME}
