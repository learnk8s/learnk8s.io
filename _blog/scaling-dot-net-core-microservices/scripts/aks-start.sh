#! /bin/bash

source variables.sh

az vm start --ids $(az vm list -g ${AKS_VM_GROUP} --query "[].id" -o tsv)

