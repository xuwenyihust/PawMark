# Import the custom save hook from the same directory
from gcs_save_hook import gcs_save_hook

c = get_config()
# c.FileContentsManager.post_save_hook = gcs_save_hook 
  
c.NotebookApp.tornado_settings = {
    'headers': {
        'Content-Security-Policy': "frame-ancestors 'self' http://localhost:5001 http://localhost:3000;",
        'X-Frame-Options': 'ALLOW-FROM http://localhost:5001 http://localhost:3000',
    }
}
c.NotebookApp.allow_origin_pat = 'http://localhost:(3000|5001)'  # Allows requests from your React app
c.NotebookApp.allow_credentials = True  # Allows cookies to be sent
c.NotebookApp.disable_check_xsrf = True
