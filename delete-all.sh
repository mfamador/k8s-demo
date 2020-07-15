#!/usr/bin/env bash

kubectl delete -f 01-deployment.yaml
kubectl delete -f 02-service.yaml
kubectl delete -f 03-ingress.yaml
kubectl delete -f 04-configmap.yaml
kubectl delete -f 05-deployment-configmap.yaml
kubectl delete -f 06-secret.yaml
kubectl delete -f 07-deployment-secret.yaml
kubectl delete -f 08-job.yaml
kubectl delete -f 09-cronjob.yaml
kubectl delete -f 10-daemonset.yaml
kubectl delete -f 11-service-ds.yaml
kubectl delete -f 12-ingress-ds.yaml
kubectl delete -f 13-deployment-sidecar.yaml

kubectl delete -f 14-dashboard-admin-user.yaml

kubectl delete -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml
