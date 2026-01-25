#!/bin/sh
set -e

echo "Waiting for MongoDB to be ready..."

MAX_RETRIES=30
COUNT=0

until node -e "
const mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://mongo:27017/furniro'
).then(() => process.exit(0)).catch(() => process.exit(1));
"; do
  COUNT=$((COUNT + 1))
  if [ "$COUNT" -ge "$MAX_RETRIES" ]; then
    echo "MongoDB not ready after $MAX_RETRIES attempts. Exiting."
    exit 1
  fi
  echo "Attempt $COUNT/$MAX_RETRIES: MongoDB not ready, waiting..."
  sleep 2
done

echo "MongoDB is ready!"

echo "Seeding database..."
node seed.js || echo "Seeding skipped (already seeded or failed)"

echo "Starting server..."
exec npm start
EOF