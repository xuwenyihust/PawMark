import subprocess
import os

def gcs_save_hook(os_path, model, contents_manager, **kwargs):
    """Save hook function for uploading notebook to GCS."""
    bucket_name = os.environ.get("BUCKET_NAME", "default-bucket-name")
    # Construct the GCS bucket path
    gcs_path = f"gs://{bucket_name}/notebooks"

    local_notebook_dir = "/home/jovyan/"
    exclude_pattern = '^(?!.*\.ipynb$).*$'
    # Sync from local to GCS
    subprocess.run(["gsutil", "-m", "rsync", "-r", "-x", exclude_pattern, local_notebook_dir, gcs_path])
