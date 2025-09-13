#!/usr/bin/env node

/**
 * Manual Email Testing Script
 * 
 * This script sends test emails to contact@disruptinc.io to verify email functionality.
 * Run with: node scripts/test-email.js
 * 
 * Make sure your backend is running with proper SMTP configuration.
 */

const EMAIL_API_URL = 'http://localhost:3001/api/send-email'
const TEST_EMAIL_RECIPIENT = 'contact@disruptinc.io'

// Test payloads
const testCases = [
  {
    name: 'Complete Form Test',
    payload: {
      name: 'Email Test User',
      email: 'test@example.com',
      company: 'Disrupt Testing Co.',
      message: 'This is a test email sent to verify the email service is working correctly. Please ignore this automated message.'
    }
  },
  {
    name: 'Minimal Form Test',
    payload: {
      email: 'minimal@example.com',
      company: 'Minimal Testing Ltd.',
    }
  },
  {
    name: 'Special Characters Test',
    payload: {
      name: 'José María González',
      email: 'special@example.com',
      company: 'Spëcial Châractërs & Co.',
      message: 'Testing special characters: áéíóú, ñ, ç, €, £, ¥ 🚀'
    }
  }
]

async function testEmailSending() {
  console.log('🔥 Starting Email Service Tests')
  console.log(`📧 Emails will be sent to: ${TEST_EMAIL_RECIPIENT}`)
  console.log('=' .repeat(60))

  // Check if backend is running
  try {
    const healthResponse = await fetch('http://localhost:3001/health')
    if (!healthResponse.ok) {
      throw new Error('Backend health check failed')
    }
    console.log('✅ Backend is running')
  } catch (error) {
    console.error('❌ Backend is not running. Please start with: node backend/server.js')
    console.error('   Make sure to configure SMTP settings in .env file')
    process.exit(1)
  }

  // Run test cases
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i]
    console.log(`\n📨 Test ${i + 1}: ${testCase.name}`)
    console.log('Payload:', JSON.stringify(testCase.payload, null, 2))
    
    try {
      const start = Date.now()
      const response = await fetch(EMAIL_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.payload),
      })

      const duration = Date.now() - start
      const result = await response.json()

      if (response.ok) {
        console.log(`✅ SUCCESS (${duration}ms):`, result.message)
      } else {
        console.log(`❌ FAILED (${duration}ms):`, result.message || 'Unknown error')
      }
    } catch (error) {
      console.log(`❌ ERROR:`, error.message)
    }
  }

  console.log('\n' + '=' .repeat(60))
  console.log('🎉 Email testing completed!')
  console.log('📧 Check contact@disruptinc.io inbox for test emails')
}

// Performance test
async function performanceTest() {
  console.log('\n🚀 Running Performance Test (5 concurrent emails)')
  
  const promises = Array.from({ length: 5 }, (_, i) => {
    const payload = {
      name: `Performance Test ${i + 1}`,
      email: `perf${i + 1}@example.com`,
      company: `Performance Testing ${i + 1}`,
      message: `Concurrent email test #${i + 1} - ${new Date().toISOString()}`
    }
    
    const start = Date.now()
    return fetch(EMAIL_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(response => ({
      success: response.ok,
      duration: Date.now() - start,
      id: i + 1
    })).catch(error => ({
      success: false,
      duration: Date.now() - start,
      id: i + 1,
      error: error.message
    }))
  })

  const results = await Promise.all(promises)
  
  const successful = results.filter(r => r.success).length
  const avgDuration = results.reduce((sum, r) => sum + r.duration, 0) / results.length
  
  console.log(`📊 Results: ${successful}/${results.length} successful`)
  console.log(`⏱️  Average duration: ${avgDuration.toFixed(0)}ms`)
}

// Error scenarios test
async function errorScenarioTest() {
  console.log('\n🚨 Testing Error Scenarios')
  
  const errorCases = [
    {
      name: 'Missing Email',
      payload: { company: 'Missing Email Co' }
    },
    {
      name: 'Invalid Email',
      payload: { email: 'not-an-email', company: 'Invalid Co' }
    },
    {
      name: 'Missing Company',
      payload: { email: 'test@example.com' }
    }
  ]

  for (const testCase of errorCases) {
    console.log(`\n⚠️  ${testCase.name}:`)
    try {
      const response = await fetch(EMAIL_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testCase.payload),
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        console.log(`✅ Correctly rejected: ${result.message}`)
      } else {
        console.log(`❌ Should have failed but didn't: ${result.message}`)
      }
    } catch (error) {
      console.log(`✅ Correctly caught error: ${error.message}`)
    }
  }
}

// Run all tests
async function runAllTests() {
  try {
    await testEmailSending()
    await performanceTest()
    await errorScenarioTest()
  } catch (error) {
    console.error('\n💥 Test suite failed:', error.message)
    process.exit(1)
  }
}

// Check for command line argument
const args = process.argv.slice(2)
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
📧 Email Testing Script

Usage:
  node scripts/test-email.js [options]

Options:
  --help, -h     Show this help message
  --basic        Run only basic email tests
  --perf         Run only performance tests
  --errors       Run only error scenario tests

Prerequisites:
  1. Backend server running (node backend/server.js)
  2. SMTP configuration in .env file
  3. Valid SMTP credentials

The script will send test emails to: ${TEST_EMAIL_RECIPIENT}
`)
  process.exit(0)
}

// Run specific test based on argument
if (args.includes('--basic')) {
  testEmailSending()
} else if (args.includes('--perf')) {
  performanceTest()
} else if (args.includes('--errors')) {
  errorScenarioTest()
} else {
  runAllTests()
}