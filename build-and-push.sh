#!/bin/bash

# Script to build and push Docker image to Docker Hub
# Usage: ./build-and-push.sh <your-dockerhub-username>

if [ -z "$1" ]; then
    echo "Usage: ./build-and-push.sh <your-dockerhub-username>"
    exit 1
fi

DOCKER_USERNAME=$1
IMAGE_NAME="ai-resume-analyzer"
VERSION="latest"

echo "🐳 Building Docker image..."
docker build -t ${IMAGE_NAME}:${VERSION} .

echo "🏷️  Tagging image..."
docker tag ${IMAGE_NAME}:${VERSION} ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}

echo "📤 Pushing to Docker Hub..."
docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}

echo "✅ Done! Your image is available at:"
echo "   docker pull ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}"

