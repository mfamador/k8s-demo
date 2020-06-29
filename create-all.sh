#!/usr/bin/env bash

kubectl create -f 01-deployment.yaml
kubectl create -f 02-service.yaml
kubectl create -f 03-ingress.yaml
kubectl create -f 04-configmap.yaml
kubectl create -f 05-deployment-configmap.yaml
kubectl create -f 06secret.yaml
kubectl create -f 07-deployment-secret.yaml
kubectl create -f 08-job.yaml
kubectl create -f 09-cronjob.yaml
kubectl create -f 10-daemonset.yaml
kubectl create -f 11-service-ds.yaml

