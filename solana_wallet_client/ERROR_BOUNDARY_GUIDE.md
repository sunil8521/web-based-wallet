# Error Boundary Setup and Usage Guide

## Overview

Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree and display a fallback UI instead of crashing the entire app.

## Components Created

### 1. ErrorBoundary (Class Component)

- **Location**: `src/components/ErrorBoundary.tsx`
- **Purpose**: Main error boundary component that catches errors
- **Features**:
  - Catches errors and displays fallback UI
  - Shows error details in development mode
  - Provides "Try Again" and "Refresh Page" buttons
  - Logs errors to console (can be extended to external services)

### 2. PageErrorBoundary (Wrapper Component)

- **Location**: `src/components/PageErrorBoundary.tsx`
- **Purpose**: Page-specific error boundary with navigation
- **Features**:
  - Custom fallback UI for pages
  - Back button functionality
  - Navigation to home page
  - Page-specific error messages

### 3. useErrorBoundary Hook

- **Location**: `src/hooks/useErrorBoundary.ts`
- **Purpose**: Functional component error handling
- **Features**:
  - Global error and promise rejection handling
  - Manual error capturing
  - Error state management

## Usage Examples

### 1. App-Level Error Boundary (Already Set Up)

```tsx
// App.tsx
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={allR} />
    </ErrorBoundary>
  );
}
```

### 2. Page-Level Error Boundary

```tsx
// Any page component
import PageErrorBoundary from "@/components/PageErrorBoundary";

function YourPageContent() {
  // Your page content here
  return <div>Page content</div>;
}

export default function YourPage() {
  return (
    <PageErrorBoundary pageName="Your Page Name">
      <YourPageContent />
    </PageErrorBoundary>
  );
}
```

### 3. Using the Error Boundary Hook

```tsx
// In any functional component
import { useErrorBoundary } from "@/hooks/useErrorBoundary";

function MyComponent() {
  const { hasError, error, resetError, captureError } = useErrorBoundary();

  const handleAsyncOperation = async () => {
    try {
      // Some async operation
      await riskyOperation();
    } catch (err) {
      captureError(err as Error);
    }
  };

  if (hasError) {
    return (
      <div>
        <p>Something went wrong: {error?.message}</p>
        <button onClick={resetError}>Try Again</button>
      </div>
    );
  }

  return <div>Component content</div>;
}
```

### 4. Custom Fallback UI

```tsx
// Custom error fallback
const CustomErrorFallback = (
  <div className="error-fallback">
    <h2>Custom Error Message</h2>
    <p>Something specific happened</p>
  </div>
);

<ErrorBoundary fallback={CustomErrorFallback}>
  <YourComponent />
</ErrorBoundary>;
```

## Best Practices

### 1. Error Boundary Placement

- **App Level**: Catch all unhandled errors
- **Route Level**: Page-specific error handling
- **Component Level**: For critical components like forms

### 2. Error Logging

```tsx
// In ErrorBoundary component
private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
  // Send to external service like Sentry, LogRocket, etc.
  // Example with Sentry:
  // Sentry.captureException(error, { extra: errorInfo });

  // For now, just console log
  console.error('Error logged:', { error, errorInfo });
};
```

### 3. Development vs Production

- Show detailed error info in development
- Show user-friendly messages in production
- Always log errors for debugging

### 4. Error Recovery

- Provide "Try Again" buttons
- Clear error state when appropriate
- Navigate to safe pages (home, etc.)

## What Error Boundaries DON'T Catch

- Errors inside event handlers
- Errors in asynchronous code (setTimeout, promises)
- Errors during server-side rendering
- Errors thrown in the error boundary itself

For these cases, use try-catch blocks and the useErrorBoundary hook.

## Testing Error Boundaries

### 1. Create a Test Component

```tsx
// For testing purposes
function ErrorThrower() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("Test error for Error Boundary");
  }

  return <button onClick={() => setShouldThrow(true)}>Throw Error</button>;
}
```

### 2. Wrap with Error Boundary

```tsx
<ErrorBoundary>
  <ErrorThrower />
</ErrorBoundary>
```

## Integration with External Services

### Sentry Integration Example

```bash
npm install @sentry/react
```

```tsx
import * as Sentry from "@sentry/react";

// In ErrorBoundary componentDidCatch
public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  Sentry.captureException(error, { extra: errorInfo });
}
```

## Environment Variables for Error Handling

Add to your `.env` file:

```env
VITE_ENABLE_ERROR_REPORTING=true
VITE_SENTRY_DSN=your_sentry_dsn_here
```

This setup provides comprehensive error handling for your Solana wallet application!
