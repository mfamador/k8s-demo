# Kubernetes demo

[K8s introduction](https://docs.google.com/presentation/d/1WORoKAQ8fVSDGDADAE04f15uazCo9fgzFISuNhV3ay4/edit?usp=sharing)

#### Create local Kubernetes cluster, e.g. k3d

    k3d create --publish 8080:80 --workers 3
     

#### Start local Kubernetes cluster
     
    k3d start

#### Monitor all resources created in default namespace

    watch kubectl get all

#### Create a deployment with 3 pods

    kubectl create -f 01-deployment.yaml

#### Create a service to load balance across the previously created pods

    kubectl create -f 02-service.yaml
    

#### Create a service to load balance across the previously created pods

    kubectl create -f 03-ingress.yaml
    
 
#### Access hello service
   
    curl -H "host:echo.com" localhost:8080
Should get the response `You've hit hello-<ID> version:1`

Look at the logs
    
    kubectl logs -f deploy/hello
    
#### Do a rolling upgrade

Edit the deployment directly on k8s
    
    kubectl edit deploy hello
    
Set image to marcoamador/hello:2
    
     curl -H "host:echo.com" localhost:8080
    
The response must be now `You've hit hello-<ID> version:2`

#### Create a configmap

    kubectl create -f 04-configmap.yaml
    
#### Use the previously created configmap in a deployment

    kubectl create -f 05-deployment-configmap.yaml
    
#### Connect to the previously created pod and check env variables

    kubectl exec -it hello-configmap-<ID> bash
    
    # env
    
or
    
    kubectl exec hello-configmap-<ID> env
    
#### Create a secret and a deployment that attaches it

    kubectl create -f 06-secret.yaml

    kubectl create -f 07-deployment-secret.yaml

and "see" the secret:
    
    kubectl exec hello-secret-<ID> env | grep SECRET_USERNAME
   
       
### Create a job and a cronjob

    kubectl create -f 08-job.yaml

    kubectl create -f 09-cronjob.yaml
 
Look at the logs
    
    kubectl logs -f countdown-<ID>
    
### Create a daemonset and a service

    kubectl create -f 10-daemonset.yaml

    kubectl create -f 11-service-ds.yaml


### Delete all created resources

    ./delete-all.sh

### Stop local Kubernetes cluster, e.g. minikube

    k3d stop


