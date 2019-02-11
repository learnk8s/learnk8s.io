#! /bin/bash

kubectl apply -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.5/deploy/manifests/00-crds.yaml
kubectl create namespace cert-manager
kubectl label namespace cert-manager certmanager.k8s.io/disable-validation=true
helm repo update
helm install \
  --name cert-manager \
  --namespace cert-manager \
  --version v0.5.2 \
  stable/cert-manager