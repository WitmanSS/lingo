#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}LinguaRead Backend Startup${NC}"
echo "======================================"

# Check if node modules are installed
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}Installing dependencies...${NC}"
  npm install
fi

# Generate Prisma Client
echo -e "${YELLOW}Generating Prisma Client...${NC}"
npx prisma generate

# Create/update database
echo -e "${YELLOW}Syncing database...${NC}"
npx prisma db push --skip-generate

# Start the development server
echo -e "${GREEN}Starting NestJS development server...${NC}"
npm run start:dev
