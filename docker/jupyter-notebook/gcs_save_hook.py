from google.cloud import storage

def gcs_save_hook(os_path, model, contents_manager, **kwargs):
    """Save hook function for uploading notebook to GCS."""
    gcs_client = storage.Client()
    bucket = gcs_client.bucket('data-platform-bucket-20231126')

    blob = bucket.blob(os_path)
    blob.upload_from_filename(os_path)

    print(f"Notebook uploaded to GCS: {os_path}")
