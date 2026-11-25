
# Imagen base del servidor web
FROM nginx:alpine

# Copiar archivos de la interfaz web
COPY frontend/src/ /usr/share/nginx/html/

# Copiar configuracion del proxy inverso
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# Puerto interno del servidor web
EXPOSE 80

# Ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
