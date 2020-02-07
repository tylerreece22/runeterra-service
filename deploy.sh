gcloud builds submit --tag gcr.io/runeterra-267409/runeterra-service .
kubectl delete deployment runeterra-deployment
kubectl apply -f deployment.yaml