from google.cloud import storage
import os

def gcs_save_hook(os_path, model, contents_manager, **kwargs):
    """Save hook function for uploading notebook to GCS."""
    gcs_client = storage.Client()
    bucket_name = os.environ.get("BUCKET_NAME", "default-bucket-name")
    bucket = gcs_client.bucket(bucket_name)

    # Remove the 'home/jovyan' prefix from the os_path
    gcs_path = os_path
    old_prefix = '/home/jovyan/'
    if gcs_path.startswith(old_prefix):
        gcs_path = gcs_path[len(old_prefix):]
    new_prefix = 'notebooks/'
    gcs_path = new_prefix + gcs_path

    blob = bucket.blob(gcs_path)
    blob.upload_from_filename(os_path)

    print(f"Notebook uploaded to GCS: {gcs_path}")
