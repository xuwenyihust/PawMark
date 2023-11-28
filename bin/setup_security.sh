# Create service account
gcloud iam service-accounts create $GCP_SA_NAME --display-name "$GCP_SA_DISPLAY_NAME"

# Grant permissions to the service account
gcloud projects add-iam-policy-binding $GCP_PROJECT_ID \
    --member "serviceAccount:$GCP_SA_NAME@$GCP_PROJECT_ID.iam.gserviceaccount.com" \
    --role "roles/storage.admin"

# Download the service account key
gcloud iam service-accounts keys create $GCP_SA_KEY_FILE \
    --iam-account $GCP_SA_NAME@$GCP_PROJECT_ID.iam.gserviceaccount.com

# Enable Workload Identity on the cluster
gcloud container clusters update $GKE_CLUSTER_NAME \
    --zone $GKE_CLUSTER_ZONE \
    --workload-pool=$GCP_PROJECT_ID.svc.id.goog

# Bind the Kubernetes service account to the Google Cloud service account
gcloud iam service-accounts add-iam-policy-binding \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:$GCP_PROJECT_ID.svc.id.goog[$GKE_NAMESPACE/$GKE_SA_NAME]" \
    $GCP_SA_NAME@$GCP_PROJECT_ID.iam.gserviceaccount.com

# Annotate the Kubernetes service account
kubectl annotate serviceaccount $GKE_SA_NAME \
    --namespace $GKE_NAMESPACE \
    iam.gke.io/gcp-service-account=$GCP_SA_NAME@$GCP_PROJECT_ID.iam.gserviceaccount.com
