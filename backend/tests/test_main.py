from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app) # Create a test client using the FastAPI app

# Define a test function for the root endpoint
def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Quiz Generator API"}