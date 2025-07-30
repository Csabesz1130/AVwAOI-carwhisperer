# Deployment Guide - Car Whisperer

This guide will help you deploy the Car Whisperer application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Database**: You'll need a PostgreSQL database (Vercel Postgres recommended)

## Step 1: Database Setup

### Option A: Vercel Postgres (Recommended)
1. Create a new Vercel project
2. Go to Storage tab
3. Create a new Postgres database
4. Copy the connection string

### Option B: External PostgreSQL
Use any PostgreSQL provider (Railway, Supabase, etc.)

## Step 2: Environment Variables

Set these environment variables in your Vercel project:

```bash
DATABASE_URL="postgresql://username:password@host:port/database"
NODE_ENV="production"
```

## Step 3: Deploy to Vercel

1. **Connect Repository**:
   - Go to Vercel Dashboard
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**:
   - Framework Preset: `Remix`
   - Build Command: `pnpm run build`
   - Install Command: `pnpm install`
   - Output Directory: `build`

3. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete

## Step 4: Database Migration

After deployment, run database migrations:

```bash
# Via Vercel CLI
vercel env pull .env.local
npx prisma migrate deploy

# Or via Vercel Dashboard
# Go to Functions tab and run the setup script
```

## Troubleshooting

### Common Issues

1. **ESM/CommonJS Error**:
   - ✅ Fixed: Updated `vite.config.ts` to use dynamic imports

2. **Database Connection**:
   - ❌ SQLite won't work on Vercel
   - ✅ Use PostgreSQL instead

3. **Build Timeout**:
   - ✅ Fixed: Added `maxDuration: 30` to `vercel.json`

4. **Missing PWA Manifest**:
   - ✅ Fixed: Created `public/manifest.webmanifest`

5. **Prisma Client Generation**:
   - ✅ Fixed: Added `postinstall` script

### Build Errors

If you encounter build errors:

1. **Check Logs**: Look at the Vercel build logs
2. **Environment Variables**: Ensure all required env vars are set
3. **Database**: Verify database connection string
4. **Dependencies**: Check if all dependencies are properly installed

### Performance Optimization

1. **Database**: Use connection pooling
2. **Assets**: Enable CDN for static assets
3. **Caching**: Implement proper caching headers

## Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Error Tracking**: Set up error monitoring
3. **Performance**: Monitor Core Web Vitals

## Security

1. **Environment Variables**: Never commit sensitive data
2. **Database**: Use strong passwords and SSL
3. **HTTPS**: Vercel provides this automatically

## Support

If you encounter issues:

1. Check the [Vercel Documentation](https://vercel.com/docs)
2. Review the [Remix Documentation](https://remix.run/docs)
3. Check the build logs in Vercel Dashboard