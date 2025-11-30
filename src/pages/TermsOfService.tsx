import { PageLayout } from '@/components/layout/PageLayout'

function TermsOfService() {
  return (
    <PageLayout showContactButton={false}>
      <div className="flex-grow">
          <div className="container mx-auto px-6 py-24 max-w-4xl">
            <h1 className="text-4xl font-display font-bold text-center mb-8">Terms of Service</h1>
            <p className="text-center text-muted-foreground mb-12">Last updated: January 2025</p>
            
            <div className="prose prose-gray max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the services provided by Disrupt Software Inc. ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">2. Description of Services</h2>
                <p className="mb-4">
                  Disrupt Software Inc. provides AI-powered automation solutions that integrate software, services, and advisory into intelligent systems. Our services include:
                </p>
                <ul className="list-disc ml-6 mb-4">
                  <li>AI agent-driven automation systems</li>
                  <li>Business process optimization</li>
                  <li>Software integration services</li>
                  <li>Consulting and advisory services</li>
                  <li>Custom software development</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">3. User Responsibilities</h2>
                <p className="mb-4">When using our services, you agree to:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Provide accurate and complete information</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Not interfere with or disrupt our services</li>
                  <li>Respect intellectual property rights</li>
                  <li>Maintain the security of your account credentials</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">4. Intellectual Property</h2>
                <p className="mb-4">
                  All content, features, and functionality of our services are owned by Disrupt Software Inc. and are protected by intellectual property laws. This includes but is not limited to:
                </p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Software code and algorithms</li>
                  <li>Documentation and materials</li>
                  <li>Trademarks and branding</li>
                  <li>Proprietary methodologies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">5. Service Availability</h2>
                <p>
                  We strive to maintain high service availability but cannot guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue services at any time with reasonable notice to users.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">6. Payment Terms</h2>
                <p className="mb-4">
                  For paid services:
                </p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Payment is due according to the agreed schedule</li>
                  <li>All fees are non-refundable unless otherwise specified</li>
                  <li>We reserve the right to modify pricing with 30 days notice</li>
                  <li>Overdue payments may result in service suspension</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">7. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Disrupt Software Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business interruption.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">8. Confidentiality</h2>
                <p>
                  We respect the confidentiality of your business information and maintain strict data protection measures. Both parties agree to keep confidential information secure and not disclose it to third parties without consent.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">9. Termination</h2>
                <p className="mb-4">
                  These terms remain in effect until terminated. Either party may terminate:
                </p>
                <ul className="list-disc ml-6 mb-4">
                  <li>With 30 days written notice</li>
                  <li>Immediately for material breach of terms</li>
                  <li>Immediately if required by law</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">10. Governing Law</h2>
                <p>
                  These Terms of Service are governed by the laws of the jurisdiction where Disrupt Software Inc. is incorporated, without regard to conflict of law principles.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">11. Contact Information</h2>
                <p className="mb-4">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> <a href="mailto:contact@disruptinc.io" className="text-blue-600 hover:underline">contact@disruptinc.io</a></p>
                  <p><strong>Company:</strong> Disrupt Software Inc.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">12. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. We will provide notice of material changes and continued use of our services constitutes acceptance of the updated terms.
                </p>
              </section>
            </div>
          </div>
      </div>
    </PageLayout>
  )
}

export default TermsOfService