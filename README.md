# k8s-demo

  - [K8s introduction](https://docs.google.com/presentation/d/1WORoKAQ8fVSDGDADAE04f15uazCo9fgzFISuNhV3ay4/edit?usp=sharing)

-  Start local Kubernetes cluster, e.g. minikube

    `minikube start`

-  Open kubernetes dashboard

    `minikube dashboard`

-  Monitor all resources created in default namespace

    `watch kubectl get all`

-  Create a deployment with 3 pods

    `kubectl create -f 01-deployment.yaml`

-  Create a service to load balance across the previously created pods

    `kubectl create -f 02-service.yaml`
    
    See the service IP
    
    `minikube service hello --url`
    
    Use the service
    
    `http $(minikube service hello --url)/anything`
    
    should get `You've hit hello-<ID>> version:1`

    See the logs
    
    `kubectl logs -f hello-<ID>`
    
- Do a rolling upgrade

    Edit the deployment directly on k8s
    
    `kubectl edit deploy hello`
    
    look for image and change to `marcoamador/hello:2`
    
    `http $(minikube service hello --url)/anything`
    
    should respond now with `You've hit hello-<ID>> version:2`

-  Create a configmap

    `kubectl create -f 03-configmap.yaml`
    
-  Use the previously created configmap in a deployment

    `kubectl create -f 04-deployment-configmap.yaml`
    
- Connect to the previously created pod and check env variables

    `kubectl exec -it hello-configmap-<ID> bash`
    
    `# env`
    
    or
    
    `kubectl exec hello-configmap-<ID> env`
    
- Create a secret and a deployment that attaches it

    `kubectl create -f 05-secret.yaml`

    `kubectl create -f 06-deployment-secret.yaml`

    and "see" the secret:
    
    `kubectl exec hello-secret-<ID>> env | grep SECRET_USERNAME`
   
       
- Create a job and a cronjob

    `kubectl create -f 07-job.yaml`

    `kubectl create -f 08-cronjob.yaml`
 
    see the log
    
    `kubectl logs -f countdown-<ID>`
    
- Create a daemonset and a service

    `kubectl create -f 09-daemonset.yaml`

    `kubectl create -f 10-service-ds.yaml`


- Delete all created resources

    `./delete-all.sh`

- Stop local Kubernetes cluster, e.g. minikube

    `minikube stop`

