FROM nginx:1.17.5-alpine

COPY src /var/www
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
