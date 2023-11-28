# Create service account
gcloud iam service-accounts create $SA_NAME --display-name "$SA_DISPLAY_NAME"

# Grant permissions to the service account
gcloud projects add-iam-policy-binding $GKE_PROJECT_ID \
    --member "serviceAccount:$SA_NAME@$GKE_PROJECT_ID.iam.gserviceaccount.com" \
    --role "roles/storage.admin"

# Download the service account key
gcloud iam service-accounts keys create $KEY_FILE \
    --iam-account $SA_NAME@$GKE_PROJECT_ID.iam.gserviceaccount.com

# Enable Workload Identity on the cluster
gcloud container clusters update $GKE_CLUSTER_NAME \
    --zone $GKE_CLUSTER_ZONE \
    --workload-pool=$GKE_PROJECT_ID.svc.id.goog

# Bind the Kubernetes service account to the Google Cloud service account
gcloud iam service-accounts add-iam-policy-binding \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:$GKE_PROJECT_ID.svc.id.goog[$NAMESPACE/$KSA_NAME]" \
    $SA_NAME@$GKE_PROJECT_ID.iam.gserviceaccount.com

# Annotate the Kubernetes service account
kubectl annotate serviceaccount $KSA_NAME \
    --namespace $NAMESPACE \
    iam.gke.io/gcp-service-account=$SA_NAME@$GKE_PROJECT_ID.iam.gserviceaccount.com

# Activate the service account
# gcloud auth activate-service-account --key-file=$KEY_FILE