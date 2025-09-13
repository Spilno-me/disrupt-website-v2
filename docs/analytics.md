# Google Analytics Setup & Tracking

This document describes the Google Analytics 4 (GA4) implementation for the Disrupt Inc. website, including setup instructions, tracking configuration, and data analysis.

## 📊 Overview

The website uses Google Analytics 4 to track essential business metrics focused on lead generation and user engagement. The implementation follows a **minimal, business-focused approach** that tracks only actionable data.

### Key Metrics Tracked
- **Lead Generation**: Form submissions and conversion data
- **Contact Intent**: Email contact interactions
- **Page Performance**: Core website usage metrics
- **User Engagement**: Automatic GA4 behavioral data

## 🔧 Configuration

### Google Analytics 4 Setup

**Property Details:**
- **Property ID**: `504857426`
- **Measurement ID**: `G-G0GBZFQJZ2`
- **Data Stream**: "DisruptInc Website"
- **Website URL**: `https://www.disruptinc.io`
- **Timezone**: `Europe/Dublin`
- **Currency**: `USD`

### Implementation Details

**Frontend Integration:**
- GA4 gtag script loaded in `index.html`
- Custom tracking functions in `src/utils/analytics.ts`
- React integration via `src/hooks/useAnalytics.ts`
- Page view tracking on route changes

**Key Files:**
```
src/
├── utils/analytics.ts          # Core tracking functions
├── hooks/useAnalytics.ts       # React integration
├── hooks/useContactFormSubmission.ts  # Form tracking
└── constants/appConstants.ts   # GA4 configuration
```

## 📈 Events Tracked

### 1. Lead Generation (High Priority)

**`lead_generated`** - Most Important Business Metric
```javascript
// Triggered on successful contact form submission
trackEvent('lead_generated', {
  source: 'contact_form',
  has_company: boolean
})
```

**`form_submission` (failures)**
```javascript
// Triggered on form submission errors
trackFormSubmission('contact_form', false)
```

### 2. Contact Intent (Medium Priority)

**`button_click` (email contact)**
```javascript
// Triggered when users click email contact links
trackButtonClick('email_contact', 'contact_info')
```

### 3. Automatic GA4 Events (Built-in)

- **`page_view`** - Automatic page navigation tracking
- **`scroll`** - User scroll behavior (automatic)
- **`user_engagement`** - Session engagement metrics (automatic)

## 🔍 Data Analysis

### Key Business Questions Answered

1. **How many leads are we generating?**
   - Monitor `lead_generated` events
   - Track conversion rates from page views

2. **Which pages convert best?**
   - Analyze `page_view` to `lead_generated` funnel
   - Identify high-performing content

3. **Are users trying to contact us?**
   - Track `email_contact` button clicks
   - Monitor contact intent signals

4. **What's our site engagement like?**
   - Review automatic `user_engagement` metrics
   - Analyze session duration and scroll depth

### Analytics Dashboards

**Real-time Monitoring:**
- Active users and live traffic
- Form submissions as they happen
- Contact interactions in real-time

**Conversion Tracking:**
- Lead generation trends over time
- Form completion vs. abandonment rates
- Contact method preferences (form vs. email)

## 🛠️ Terminal API Access

### Setup Google Cloud CLI

The website includes terminal access to Google Analytics data via the Google Analytics Data API.

**Prerequisites:**
- Google Cloud CLI installed
- Authentication with proper Analytics scopes
- Project: `disrupt-website-analytics`

**Installation & Authentication:**
```bash
# Install Google Cloud CLI
curl https://sdk.cloud.google.com | bash

# Authenticate with Analytics API access
gcloud auth application-default login \
  --scopes=https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/analytics.readonly

# Set quota project
gcloud config set project disrupt-website-analytics
gcloud auth application-default set-quota-project disrupt-website-analytics

# Enable APIs
gcloud services enable analyticsdata.googleapis.com
gcloud services enable analyticsadmin.googleapis.com
```

### API Usage Examples

**Check Real-time Events:**
```bash
ACCESS_TOKEN=$(gcloud auth application-default print-access-token --project=disrupt-website-analytics)
curl -X POST "https://analyticsdata.googleapis.com/v1beta/properties/504857426:runRealtimeReport" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "X-Goog-User-Project: disrupt-website-analytics" \
  -d '{
    "dimensions": [{"name": "eventName"}],
    "metrics": [{"name": "eventCount"}],
    "limit": 20
  }'
```

**Historical Data (Last 30 Days):**
```bash
curl -X POST "https://analyticsdata.googleapis.com/v1beta/properties/504857426:runReport" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "X-Goog-User-Project: disrupt-website-analytics" \
  -d '{
    "dateRanges": [{"startDate": "30daysAgo", "endDate": "today"}],
    "dimensions": [{"name": "pagePath"}],
    "metrics": [{"name": "screenPageViews"}],
    "limit": 10
  }'
```

## 🎯 Tracking Philosophy

### What We Track (Business-Focused)

✅ **Lead Generation** - Direct business impact
✅ **Contact Intent** - User conversion signals
✅ **Core Performance** - Website effectiveness
✅ **User Engagement** - Content quality metrics

### What We Don't Track (Noise Reduction)

❌ **Individual field interactions** - Too granular
❌ **Legal link clicks** - No business insight
❌ **Minor UI interactions** - Creates data noise
❌ **Detailed form field analytics** - Redundant with conversions

### Benefits of This Approach

- **Clean Data**: Only actionable metrics
- **Fast Performance**: Minimal tracking overhead
- **Clear Insights**: Easy to identify trends
- **Privacy-Friendly**: Tracks behavior, not personal data

## 🔒 Privacy & Compliance

### Data Collection

**What's Collected:**
- Page views and navigation patterns
- Form submission success/failure
- Contact interaction events
- Device and browser information (automatic)

**What's NOT Collected:**
- Personal information (names, emails)
- Individual form field contents
- Detailed user identification data

### GDPR Compliance

- Analytics configured with `send_page_view: false` for custom control
- No personal data tracked in custom events
- Users can opt-out via browser settings
- Privacy policy includes analytics disclosure

### Cookie Usage

- Google Analytics uses first-party cookies
- No additional tracking cookies implemented
- Standard GA4 cookie policy applies
- Respects user Do Not Track preferences

## 📊 Sample Data Structure

### Typical Event Flow

1. **User visits site** → `page_view` (automatic)
2. **User scrolls/engages** → `scroll`, `user_engagement` (automatic)
3. **User clicks email link** → `button_click` (email_contact)
4. **User submits form successfully** → `lead_generated` (key metric)

### Event Data Examples

**Lead Generation Event:**
```json
{
  "event_name": "lead_generated",
  "parameters": {
    "source": "contact_form",
    "has_company": true
  }
}
```

**Contact Intent Event:**
```json
{
  "event_name": "button_click",
  "parameters": {
    "button_name": "email_contact",
    "location": "contact_info"
  }
}
```

## 🚀 Monitoring & Maintenance

### Regular Monitoring

**Weekly Reviews:**
- Check lead generation trends
- Monitor form completion rates
- Review top-performing pages

**Monthly Analysis:**
- Conversion funnel analysis
- User engagement patterns
- Contact method effectiveness

### Troubleshooting

**Common Issues:**
- **No events showing**: Check GA4 property ID configuration
- **API access denied**: Verify authentication and scopes
- **Missing lead data**: Check form submission tracking implementation

**Debug Tools:**
- Google Analytics DebugView for real-time testing
- Browser developer tools for event verification
- GA4 Real-time reports for immediate feedback

## 📞 Support

For analytics questions or issues:
- Check GA4 Real-time reports first
- Review browser console for tracking errors
- Verify API authentication for command-line access
- Test form submissions in development environment

---

*Last updated: January 2025*
*Analytics implementation follows Google Analytics 4 best practices*