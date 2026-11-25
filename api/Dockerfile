
# Imagen base de Python
FROM python:3.12-slim

# Configuracion del entorno Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Directorio de trabajo
WORKDIR /app

# Copiar e instalar dependencias
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copiar codigo fuente y pruebas
COPY src/ ./src/
COPY tests/ ./tests/

# Puerto interno de la API
EXPOSE 5000

# Ejecutar la aplicacion Flask
CMD ["python", "src/app.py"]
