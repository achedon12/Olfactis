#!/bin/bash

# Install the Olfactis backend
cd backend
npm install

# Start Docker containers
docker compose -p olfactis up -d

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to be ready..."
until node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://root:rootpassword@localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log('MongoDB is ready'); process.exit(0); }).catch(() => { process.exit(1); });"
do
    sleep 1
done

# Run the seeder
echo "Seeding the database..."
node seeders/seed.js
echo "Database seeded"

# Start the backend
npm run dev &
cd ..

# Install the Olfactis frontend
cd frontend
npm install
npm run dev &
cd ..