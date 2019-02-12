#! /bin/bash

kubectl apply -f helm-rbac.yaml
helm init --service-account tiller
kubectl get pods --namespace kube-system