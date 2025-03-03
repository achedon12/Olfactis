#!/bin/bash

# Install the Olfactis API
cd backend && npm install && docker compose up -d && npm run dev && cd ..

# Install the Olfactis application
cd frontend && npm install && npm run dev && cd ..