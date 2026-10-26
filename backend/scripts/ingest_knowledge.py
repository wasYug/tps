import json

from app.services.rag.ingestion import ingest_knowledge


def main():
    result = ingest_knowledge()
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()

    # python -m scripts.ingest_knowledge