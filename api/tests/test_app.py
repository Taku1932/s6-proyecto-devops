
import pytest
from src.app import app


# Configuracion del cliente de pruebas
@pytest.fixture
def client():
    app.config["TESTING"] = True

    with app.test_client() as client:
        yield client


# Prueba 1: disponibilidad de la API
def test_health_status(client):
    response = client.get("/health")

    assert response.status_code == 200


# Prueba 2: contenido del estado del servicio
def test_health_response(client):
    response = client.get("/health")
    data = response.get_json()

    assert data["status"] == "ok"


# Prueba 3: disponibilidad del catalogo
def test_documentos_status(client):
    response = client.get("/api/documentos")

    assert response.status_code == 200


# Prueba 4: formato JSON del catalogo
def test_documentos_json(client):
    response = client.get("/api/documentos")

    assert response.is_json


# Prueba 5: existencia de datos en el catalogo
def test_documentos_contenido(client):
    response = client.get("/api/documentos")
    data = response.get_json()

    assert isinstance(data, (list, dict))
    assert len(data) > 0


# Prueba 6: manejo de rutas inexistentes
def test_ruta_inexistente(client):
    response = client.get("/ruta-inexistente")

    assert response.status_code == 404
