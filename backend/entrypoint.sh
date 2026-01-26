# Create entrypoint script for seeding and starting server
#!/bin/sh
set -e

echo "Waiting for MongoDB to be ready..."
for i in $(seq 1 30); do
  if node -e "const m = require('mongoose'); m.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/furniro').then(() => process.exit(0)).catch(() => process.exit(1))" 2>/dev/null; then
    echo "MongoDB is ready!"
    break
  fi
  echo "Attempt $i/30: MongoDB not ready, waiting..."
  sleep 2
done

echo "Seeding database..."
node seed.js || echo "Seeding failed or already seeded"

echo "Starting server..."
npm start
