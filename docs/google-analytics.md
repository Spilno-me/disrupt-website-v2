# Google Analytics 4 Setup

This project includes Google Analytics 4 (GA4) integration for tracking user interactions and page views.

## Configuration

### 1. Environment Variables

Add your GA4 Measurement ID to your environment variables:

```bash
# .env or .env.local
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. Getting Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or use an existing one
3. Navigate to Admin > Property Settings > Data Streams
4. Select your web data stream
5. Copy the Measurement ID (format: G-XXXXXXXXXX)

## Features

### Automatic Tracking
- **Page Views**: Automatically tracked on route changes
- **Form Submissions**: Contact form submissions with success/failure status
- **Button Clicks**: Can be added to track specific user interactions

### Custom Events
The analytics utility provides helper functions for custom event tracking:

```typescript
import { trackEvent, trackFormSubmission, trackButtonClick } from '@/utils/analytics'

// Track custom events
trackEvent('custom_event', { param1: 'value1' })

// Track form submissions
trackFormSubmission('contact_form', true) // success
trackFormSubmission('contact_form', false) // failure

// Track button clicks
trackButtonClick('cta_button', 'hero_section')
```

## Privacy Considerations

- GA4 only initializes when a valid Measurement ID is provided
- The implementation respects user privacy settings
- Page view tracking is manual to provide better control over data collection

## Development vs Production

- **Development**: Analytics won't initialize with the default placeholder ID (`G-XXXXXXXXXX`)
- **Production**: Ensure the `VITE_GA4_MEASUREMENT_ID` environment variable is properly set

## Files Structure

```
src/
├── constants/appConstants.ts    # GA4 configuration
├── utils/analytics.ts           # Analytics utilities
├── hooks/useAnalytics.ts        # React hook for analytics
└── hooks/useContactFormSubmission.ts  # Form tracking integration
```

## Implementation Details

The GA4 implementation:
1. Dynamically loads the gtag script when analytics is initialized
2. Provides TypeScript-safe event tracking functions
3. Integrates with React Router for automatic page view tracking
4. Includes form submission tracking in the contact form
5. Uses environment variables for configuration management