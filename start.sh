#!/bin/bash

cd backend
export $(grep -v '^#' .env | xargs)

npm install

docker compose -p olfactis up -d

echo "Waiting for MongoDB to be ready..."
until node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log('MongoDB is ready'); process.exit(0); }).catch(() => { process.exit(1); });"
do
    sleep 1
done

echo "Seeding the database..."
node seeders/seed.js
echo "Database seeded"

npm run dev &
cd ..

cd frontend
npm install
npm run dev &
cd ..