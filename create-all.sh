#!/usr/bin/env bash

kubectl apply -f 01-deployment.yaml
kubectl apply -f 02-service.yaml
kubectl apply -f 03-ingress.yaml
kubectl apply -f 04-configmap.yaml
kubectl apply -f 05-deployment-configmap.yaml
kubectl apply -f 06-secret.yaml
kubectl apply -f 07-deployment-secret.yaml
kubectl apply -f 08-job.yaml
kubectl apply -f 09-cronjob.yaml
kubectl apply -f 10-daemonset.yaml
kubectl apply -f 11-service-ds.yaml
kubectl apply -f 12-ingress-ds.yaml
kubectl apply -f 13-dashboard-admin-user.yaml

kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml
