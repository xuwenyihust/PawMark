#!/bin/sh

# Replace placeholders in your built React app with actual environment variables
envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

# Start the nginx server
nginx -g 'daemon off;'
