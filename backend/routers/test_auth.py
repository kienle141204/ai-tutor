import unittest
from fastapi.testclient import TestClient
from app.main import app

class TestAuthAPI(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_register_user(self):
        response = self.client.post("/api/auth/register", json={
            "name": "Test User",
            "email": "test@example.com",
            "phone": "1234567890",
            "password": "testpassword"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json())
        self.assertEqual(response.json()["email"], "test@example.com")

    def test_login_user(self):
        # First register a user
        self.client.post("/api/auth/register", json={
            "name": "Test User",
            "email": "test@example.com",
            "phone": "1234567890",
            "password": "testpassword"
        })
        
        # Then try to login
        response = self.client.post("/api/auth/login", data={
            "username": "test@example.com",
            "password": "testpassword"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("access_token", response.json())

if __name__ == "__main__":
    unittest.main()