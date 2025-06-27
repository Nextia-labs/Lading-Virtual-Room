Nextia Virtual Room - Replit.md
Overview
Nextia Virtual Room is a full-stack digital fitting platform that combines a beautiful subscription-based landing page with AR-powered virtual fitting experiences. The application features complete user authentication, Stripe payment integration, and a modern React frontend with Express.js backend.

System Architecture
Frontend Architecture
React 18 with TypeScript: Component-based architecture using functional components and hooks
Styling: Tailwind CSS with custom design system and Shadcn UI components
Routing: Wouter for lightweight client-side routing
State Management: TanStack Query for server state management
Forms: React Hook Form with Zod validation
Payment Processing: Stripe Elements for secure payment handling
Backend Architecture
Express.js with TypeScript: RESTful API server with middleware-based architecture
Database: PostgreSQL with Drizzle ORM for type-safe database operations
Authentication: Passport.js with session-based authentication using bcrypt for password hashing
Payment Processing: Stripe SDK for subscription management
Session Storage: Memory store for development (production should use Redis/database)
Key Components
Authentication System
Registration/Login: Username/email-based authentication with password hashing
Session Management: Express sessions with secure cookie configuration
Protected Routes: Client-side route protection with authentication checks
User Management: Complete user CRUD operations with Stripe customer integration
Payment Integration
Stripe Integration: Full subscription lifecycle management
Three Subscription Tiers: Basic, Pro, and Enterprise plans
Payment Flow: Secure client-side payment forms with server-side validation
Customer Management: Automatic Stripe customer creation and subscription tracking
Database Schema
Users Table: Core user information with Stripe integration fields
Schema Validation: Zod schemas for type-safe data validation
Migration System: Drizzle migrations for database schema management
UI/UX Design System
Custom Color Palette: Futuristic fashion-inspired colors (Plasma White, Light Cyan, Fashion Pink, etc.)
Responsive Design: Mobile-first approach with Tailwind CSS
Component Library: Shadcn UI components with custom theming
Accessibility: ARIA-compliant components and keyboard navigation
Data Flow
Authentication Flow
User registers/logs in through React forms
Credentials validated with Zod schemas
Server authenticates using Passport.js
Session created and stored in memory store
Client receives authentication status via React Query
Payment Flow
User selects subscription plan on homepage
Redirected to Stripe Elements payment form
Payment processed through Stripe API
Server creates/updates customer and subscription records
User gains access to protected virtual room features
Protected Route Flow
Client attempts to access protected route
Authentication status checked via React Query
Unauthenticated users redirected to auth page
Authenticated users granted access to protected content
External Dependencies
Core Dependencies
Database: PostgreSQL (configured for Neon serverless)
Payment Processing: Stripe (development keys required)
UI Framework: React 18 with TypeScript
Styling: Tailwind CSS + Shadcn UI components
ORM: Drizzle with PostgreSQL adapter
Development Tools
Build System: Vite for frontend bundling
TypeScript: Full type safety across frontend/backend
Linting: ESLint configuration
Package Manager: NPM with lockfile
Environment Configuration
DATABASE_URL: PostgreSQL connection string
SESSION_SECRET: Session encryption key
STRIPE_SECRET_KEY: Server-side Stripe API key
VITE_STRIPE_PUBLIC_KEY: Client-side Stripe publishable key
STRIPE_WEBHOOK_SECRET: Webhook signature verification
Deployment Strategy
Replit Configuration
Modules: Node.js 20, Web, PostgreSQL 16
Build Command: npm run build (Vite + ESBuild)
Start Command: npm run start (production) or npm run dev (development)
Port Configuration: Internal port 5000 mapped to external port 80
Autoscale Deployment: Configured for automatic scaling
Environment Setup
Development: Hot reloading with Vite dev server
Production: Static file serving with Express
Database: Automatic PostgreSQL provisioning in Replit
Session Storage: Memory store (should migrate to persistent storage for production)
Security Considerations
Password Hashing: Bcrypt with salt for secure password storage
Session Security: HTTP-only cookies with secure flag in production
CORS Configuration: Properly configured for frontend/backend communication
Environment Variables: Sensitive keys stored in Replit secrets
Changelog
Changelog:
- June 24, 2025: Initial setup and complete implementation
- Added comprehensive landing page with Hero, Features, How-It-Works, Testimonials, and Pricing sections
- Implemented 3 subscription tiers (Basic $9, Pro $29, Enterprise $99) with Stripe integration
- Added complete authentication system with registration and login
- Set up PostgreSQL database with user management
- Added responsive design with custom Nextia color palette
- Implemented protected routes and subscription payment flow
User Preferences
Preferred communication style: Simple, everyday language.