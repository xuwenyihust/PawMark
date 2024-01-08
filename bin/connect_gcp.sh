# Authenticate with Google Cloud
echo "Authenticating with Google Cloud..."

# Check if already logged in
CURRENT_ACCOUNT=$(gcloud config get-value account)

if [ -z "$CURRENT_ACCOUNT" ]; then
    echo "No active account, authenticating with Google Cloud..."
    gcloud auth login
else
    echo "Already logged in as $CURRENT_ACCOUNT"
fi

gcloud config set project $GCP_PROJECT_ID

# Check if the cluster already exists
if gcloud container clusters describe $GKE_CLUSTER_NAME --zone $GKE_CLUSTER_ZONE --project $GKE_PROJECT_ID > /dev/null 2>&1; then
    echo "Cluster $GKE_CLUSTER_NAME already exists."
else
    echo "Creating cluster $GKE_CLUSTER_NAME..."
    gcloud container clusters create $GKE_CLUSTER_NAME \
     --zone $GKE_CLUSTER_ZONE \
     --project $GCP_PROJECT_ID \
     --num-nodes $GKE_CLUSTER_NUM_NODES \
     --machine-type $GKE_CLUSTER_MACHINE_TYPE \
     --workload-pool=$GCP_PROJECT_ID.svc.id.goog
fi

# Connect to the cluster
echo "Getting credentials for cluster $GKE_CLUSTER_NAME..."
gcloud container clusters get-credentials $GKE_CLUSTER_NAME --zone $GKE_CLUSTER_ZONE --project $GCP_PROJECT_ID

# Now kubectl is configured to use your GKE cluster
echo "Connected to GKE cluster: $GKE_CLUSTER_NAME"

# Get GKE endpoint info
export KUBERNETES_API_SERVER_HOST=$(gcloud container clusters describe $GKE_CLUSTER_NAME --zone $GKE_CLUSTER_ZONE --format='value(endpoint)')
echo "Kubernetes API server host: $KUBERNETES_API_SERVER_HOST"

# Check if the bucket already exists
if gsutil ls -b "gs://$BUCKET_NAME" >/dev/null 2>&1; then
    echo "Bucket gs://$BUCKET_NAME already exists."
else
    echo "Bucket gs://$BUCKET_NAME does not exist. Creating the bucket."
    gsutil mb -l $BUCKET_LOCATION -c $BUCKET_STORAGE_CLASS "gs://$BUCKET_NAME"
fi

# Create event-logs folder
if gsutil ls -b "gs://$BUCKET_NAME/event-logs" >/dev/null 2>&1; then
    echo "Bucket gs://$BUCKET_NAME/event-logs already exists."
else
    echo "Folder gs://$BUCKET_NAME/event-logs does not exist. Creating the folder."
    gsutil cp -r ./resources/event-logs gs://$BUCKET_NAME/event-logs
fi