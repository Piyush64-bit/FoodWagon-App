// middleware.ts

import { clerkMiddleware } from '@clerk/nextjs/server';
import { createRouteMatcher } from '@clerk/nextjs/server';

// Define routes that need authentication
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  // Add more protected routes here like:
  // '/dashboard(.*)',
  // '/orders(.*)'
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
