
import os
from flask import Flask, jsonify

app = Flask(__name__)

# Configuracion mediante variables de entorno
APP_NAME = os.getenv("APP_NAME", "Portal de Documentos Administrativos")
APP_ENV = os.getenv("APP_ENV", "development")

# Catalogo simulado de documentos administrativos
documentos = [
    {
        "id": 1,
        "nombre": "Manual de procedimientos",
        "categoria": "Procedimientos",
        "version": "1.0",
        "estado": "Vigente"
    },
    {
        "id": 2,
        "nombre": "Politica de seguridad",
        "categoria": "Politicas",
        "version": "2.0",
        "estado": "Vigente"
    },
    {
        "id": 3,
        "nombre": "Informe de gestion",
        "categoria": "Informes",
        "version": "1.2",
        "estado": "En revision"
    },
    {
        "id": 4,
        "nombre": "Registro de solicitudes",
        "categoria": "Registros",
        "version": "1.0",
        "estado": "Vigente"
    },
    {
        "id": 5,
        "nombre": "Protocolo de respaldo documental",
        "categoria": "Procedimientos",
        "version": "1.1",
        "estado": "Vigente"
    }
]


# Endpoint para consultar el catalogo
@app.route("/api/documentos", methods=["GET"])
def obtener_documentos():
    return jsonify({
        "total": len(documentos),
        "documentos": documentos
    }), 200


# Endpoint para verificar el estado del servicio
@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "service": APP_NAME,
        "environment": APP_ENV
    }), 200


# Inicio de la aplicacion
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
