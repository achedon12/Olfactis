#!/bin/bash

# Install the Olfactis API
cd api && npm install && docker compose up -d && npm run dev && cd ..

# Install the Olfactis application
cd olfactis && npm install && npm run dev && cd ..