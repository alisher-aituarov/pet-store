#!/bin/sh

cd frontend
mkdir -p node_modules
docker cp frontend_pet:/app/node_modules ./

cd ..

cd backend
mkdir -p node_modules
docker cp backend_pet:/app/node_modules ./