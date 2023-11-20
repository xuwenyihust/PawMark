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

gcloud config set project $GKE_PROJECT_ID

# Get credentials for GKE cluster
echo "Getting credentials for GKE cluster..."
gcloud container clusters get-credentials $GKE_CLUSTER_NAME --zone $GKE_CLUSTER_ZONE --project $GKE_PROJECT_ID

# Now kubectl is configured to use your GKE cluster
echo "Connected to GKE cluster: $GKE_CLUSTER_NAME"
