#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up production environment...');

try {
  // Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Run database migrations if DATABASE_URL is set
  if (process.env.DATABASE_URL) {
    console.log('🗄️ Running database migrations...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  } else {
    console.log('⚠️ DATABASE_URL not set, skipping migrations');
  }

  console.log('✅ Production setup complete!');
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}