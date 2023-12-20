# Check if the GKE cluster exists
if gcloud container clusters list --project $GCP_PROJECT_ID --zone $GKE_CLUSTER_ZONE --filter="name=$GKE_CLUSTER_NAME" | grep -q $GKE_CLUSTER_NAME; then
    echo "Cluster $GKE_CLUSTER_NAME exists. Deleting the cluster."
    
    # Delete the cluster
    gcloud container clusters delete $GKE_CLUSTER_NAME --zone $GKE_CLUSTER_ZONE --project $GCP_PROJECT_ID
else
    echo "Cluster $GKE_CLUSTER_NAME does not exist or you don't have permission to access it."
fi

# Check if the bucket exists
if gsutil ls -b "gs://$BUCKET_NAME" >/dev/null 2>&1; then
    echo "Bucket gs://$BUCKET_NAME exists. Deleting the bucket and its contents."

    # Delete all objects in the bucket
    gsutil -m rm -r "gs://$BUCKET_NAME/**"

    # Remove the bucket
    gsutil rb "gs://$BUCKET_NAME"
else
    echo "Bucket gs://$BUCKET_NAME does not exist or you don't have permission to access it."
fi