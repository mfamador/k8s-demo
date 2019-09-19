#!/usr/bin/env bash

kubectl create -f 01-deployment.yaml
kubectl create -f 02-service.yaml
kubectl create -f 03-configmap.yaml
kubectl create -f 04-deployment-configmap.yaml
kubectl create -f 05-secret.yaml
kubectl create -f 06-deployment-secret.yaml
kubectl create -f 07-job.yaml
kubectl create -f 08-cronjob.yaml
kubectl create -f 09-daemonset.yaml
kubectl create -f 10-service-ds.yaml

