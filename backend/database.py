from google.cloud import firestore
from config import settings


def get_firestore_client() -> firestore.Client:
    # Initialize Firestore using the specified project
    # This will use Application Default Credentials
    return firestore.Client(project=settings.gcp_project_id, database="lumina-deploy")


db = get_firestore_client()
