#!/bin/bash

# shellcheck disable=SC2164
cd backend
# shellcheck disable=SC2046
export $(grep -v '^#' .env | xargs)

npm install

docker compose -p olfactis up

echo "Waiting for MongoDB to be ready..."
until node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGO_URI).then(() => { console.log('MongoDB is ready'); process.exit(0); }).catch(() => { process.exit(1); });"
do
    sleep 1
done

echo "Seeding the database..."
node seeders/seed.js
echo "Database seeded"

npm run dev &
# shellcheck disable=SC2103
cd ..

cd frontend
npm install
npm run dev &
cd ..