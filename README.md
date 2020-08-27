# Kubernetes demo

## Create a local Kubernetes cluster, e.g. [k3d](https://k3d.io/#installation)

    k3d cluster create -p 8080:80@loadbalancer
    
#### add a few worker nodes

    k3d node create node-pool-1 --replicas 3

## Start the local Kubernetes cluster if you created it before
     
    k3d start

## Set the kubernetes context

    kubectl config use-context k3d-k3s-default

or use [kubectx](https://github.com/ahmetb/kubectx)

    kubectx k3d-k3s-default

## Create the `demo` namespace
     
    kubectl create namespace demo
    
or

    kubectl create -f 00-namepace.yaml


## Set `demo` namespace by default
     
    kubectl config set-context --current --namespace=demo
    
or use kubens (comes with [kubectx](https://github.com/ahmetb/kubectx))

    kubens demo

## Monitor all resources created in `demo` namespace

    watch kubectl get all --namespace demo

## Create a deployment with 3 pods

    kubectl create -f 01-deployment.yaml

## Create a service to load balance across the previously created pods

    kubectl create -f 02-service.yaml
    
    
## Make a request to the newly created service
create a port-foward directly to the service port:
 
    kubectl port-forward svc/hello 8888:8000
    
and in another terminal

    curl localhost:8888
    
## Create an ingress to expose the service to the internet (needs an Ingress controller - K3d has a bundled Traefik)

    kubectl create -f 03-ingress.yaml
 
## Access hello service through the previously created ingress
   
    curl -H "host:echo.com" localhost:8080
    
Should get the response `You've hit hello-<ID> version:1`

Look at the logs
    
    kubectl logs -f deploy/hello
    

## Scale the hello deployment
   
    kubectl scale deployment hello --replicas 5

Look at the logs
    
    kubectl logs -f deploy/hello
    
or use [stern](https://github.com/wercker/stern) to see the logs from all the pods

    stern hello


## Do a rolling upgrade

Edit the deployment directly on k8s
    
    kubectl edit deploy hello
    
Set image to marcoamador/hello:2
    
     curl -H "host:echo.com" localhost:8080
    
The response must be now `You've hit hello-<ID> version:2`


## Create a configmap

    kubectl create -f 04-configmap.yaml
    
    
## Use the previously created configmap in a deployment

    kubectl create -f 05-deployment-configmap.yaml
    
    
## Connect to the previously created pod and check env variables

    kubectl exec -it hello-configmap-<ID> -- sh
    
    # env
    
or
    
    kubectl exec hello-configmap-<ID> -- env
    
## Create a secret and a deployment that attaches it

    kubectl create -f 06-secret.yaml

    kubectl create -f 07-deployment-secret.yaml

and "see" the secret:
    
    kubectl exec hello-secret-<ID> -- env | grep SECRET_
   
       
## Create a job and a cronjob

    kubectl create -f 08-job.yaml

    kubectl create -f 09-cronjob.yaml
 
Look at the logs
    
    kubectl logs -f countdown-<ID>
 
 or
 
    kubectl logs -f job/countdown
    
 
## Create a daemonset, a service and ingress

    kubectl create -f 10-daemonset.yaml

    kubectl create -f 11-service-ds.yaml

    kubectl create -f 12-ingress-ds.yaml

    curl -H "host:echo-ds.com" localhost:8080
    

## Create a deployment with a sidecar

    kubectl create -f 13-deployment-sidecar.yaml

see the logs from main container and sidecar in terminals side by side
    
sidecar cache proxy

    kubectl logs -f deploy/hello-sidecar --container vache-proxy
    
the container with our API to be cached

    kubectl logs -f deploy/hello-sidecar --container hello
    
or use `stern`

    stern hello-sidecar --container vache-proxy
    stern hello-sidecar --container hello
    
both container in same log:

    stern hello-sidecar 
 
 
make some requests (repeat them to see that the requests are cached for 15 secs):

    curl -H "host:echo-sidecar.com" http://localhost:8080/something/1

    curl -H "host:echo-sidecar.com" http://localhost:8080/something/2
 
 
 
# Kubernetes dashboard


## Install dashboard

    kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml

## Create admin user

    kubectl apply -f 14-dashboard-admin-user.yaml
    
## Get user token

    kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')

## Access dashboard

    kubectl proxy
    
open [http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/](http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/) 


# Cleanup

## Delete all created resources

    ./delete-all.sh

## Stop local Kubernetes cluster

    k3d stop

## Delete the local Kubernetes cluster

    k3d delete


