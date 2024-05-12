# Import the custom save hook from the same directory
from gcs_save_hook import gcs_save_hook

c = get_config()
# c.FileContentsManager.post_save_hook = gcs_save_hook 
  
c.NotebookApp.tornado_settings = {
    'headers': {
        'Content-Security-Policy': "frame-ancestors 'self' http://localhost:5001",
        'X-Frame-Options': 'ALLOW-FROM http://localhost:5001',
    }
}