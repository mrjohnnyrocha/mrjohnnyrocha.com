# Use an official Nginx image
FROM nginx:alpine

# Copy the built app to Nginx's serve directory
COPY ./dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx and keep it running
CMD ["nginx", "-g", "daemon off;"]
