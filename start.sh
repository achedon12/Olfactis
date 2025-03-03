#!/bin/bash

# Install the Olfactis backend
cd backend && npm install && docker compose -p olfactis up -d && npm run dev && cd ..

# Install the Olfactis frontend
cd frontend && npm install && npm run dev && cd ..