#! /bin/bash

source variables.sh

az group delete --name ${RESOURCE_GROUP} --yes --no-wait
kubectl config unset users.clusterUser_${RESOURCE_GROUP}_${CLUSTER_NAME}
kubectl config unset contexts.${CLUSTER_NAME}
kubectl config unset clusters.${CLUSTER_NAME}

