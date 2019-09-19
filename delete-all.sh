#!/usr/bin/env bash

kubectl delete all --all -n default

kubectl delete secret test-secret
kubectl delete configmap configs

