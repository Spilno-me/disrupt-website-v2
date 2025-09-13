import { PageLayout } from '@/components/layout/PageLayout'
import { UI_CONSTANTS } from '@/constants/appConstants'

function PrivacyPolicy() {
  const handleHomeNavigation = () => {
    window.location.href = '/'
  }

  return (
    <PageLayout>
      <div className="flex-grow">
          <div className="container mx-auto px-6 py-24 max-w-4xl">
            <h1 className="text-4xl font-display font-bold text-center mb-8">Privacy Information Statement</h1>
            <p className="text-center text-muted-foreground mb-12">Last updated: January 2025</p>
            
            <div className="prose prose-gray max-w-none tracking-wide">
              <p className="mb-8 text-lg">
                At Disrupt Inc., we value your privacy and are committed to protecting your personal data. This Privacy Information Statement explains how we collect, use, store, and safeguard information, in compliance with applicable data protection and security regulations, including the EU General Data Protection Regulation (GDPR), the NIS2 Directive, and globally recognized frameworks such as NIST Cybersecurity Framework, ISO 27001, and SOC 2.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">1. Who We Are</h2>
                <p>
                  Disrupt Inc. acts as the controller of your personal data, unless otherwise specified. We are committed to transparency and accountability in how we process personal data and how we protect your rights.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">2. Scope of This Statement</h2>
                <p className="mb-4">This statement applies to:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Visitors to our websites</li>
                  <li>Users of our services and platforms</li>
                  <li>Participants in our events, webinars, or training</li>
                  <li>Business contacts and stakeholders</li>
                </ul>
                <p>
                  When acting as a processor (on behalf of our customers), our customers' privacy policies govern, and we operate under strict contractual commitments.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">3. Data We Collect</h2>
                <p className="mb-4">We may collect:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Identifiers (name, email, phone, organization)</li>
                  <li>Account details (login information, billing data)</li>
                  <li>Usage information (cookies, device info, IP addresses, session data)</li>
                  <li>Website analytics data through Google Analytics (page views, user interactions, device information)</li>
                  <li>Business communications (support requests, emails, call records)</li>
                </ul>
                <p>We limit collection to what is necessary for the stated purposes.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">4. Why We Process Data</h2>
                <p className="mb-4">We process personal data to:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Manage billing, licensing, and user accounts</li>
                  <li>Deliver customer support and respond to inquiries</li>
                  <li>Organize and host events</li>
                  <li>Ensure cybersecurity, resilience, and compliance</li>
                  <li>Fulfill legal and regulatory obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">5. Lawful Bases for Processing</h2>
                <p className="mb-4">Depending on context, processing is based on:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Consent (e.g., newsletters)</li>
                  <li>Contract (e.g., account setup, service provision)</li>
                  <li>Legitimate interests (e.g., service improvements, security monitoring)</li>
                  <li>Legal obligations (e.g., regulatory compliance)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">6. Data Sharing & International Transfers</h2>
                <p className="mb-4">We may share personal data with:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Trusted service providers (cloud hosting, analytics, payment processors)</li>
                  <li>Google Analytics for website usage analysis and performance monitoring</li>
                  <li>Affiliates and partners</li>
                  <li>Regulators or law enforcement where legally required</li>
                </ul>
                <p>
                  For international transfers, we implement GDPR-compliant safeguards such as Standard Contractual Clauses (SCCs).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">7. Data Retention</h2>
                <p>
                  We retain data only as long as necessary to fulfill the purposes described or as required by law. When no longer needed, data is securely deleted or anonymized.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">8. Security & Compliance Frameworks</h2>
                <p className="mb-4">
                  Disrupt Inc. employs a defense-in-depth security strategy, including encryption, access control, monitoring, and regular security testing.
                </p>
                <p className="mb-4">We align with:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li><strong>GDPR</strong> – EU data protection rights</li>
                  <li><strong>NIS2 Directive</strong> – EU cybersecurity risk management and incident reporting</li>
                  <li><strong>NIST Cybersecurity Framework</strong> – US best practices for identification, protection, detection, response, and recovery</li>
                  <li><strong>ISO 27001</strong> – international information security standard</li>
                  <li><strong>SOC 2</strong> – service organization controls and trust principles</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">9. Breach Notification</h2>
                <p>
                  In the unlikely event of a data breach, Disrupt Inc. will notify affected individuals and supervisory authorities without undue delay, in accordance with GDPR, NIS2, and other applicable requirements.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">10. Your Privacy Rights</h2>
                <p className="mb-4">Depending on your jurisdiction, you may have the right to:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Access your personal data</li>
                  <li>Rectify inaccuracies</li>
                  <li>Erase data ("right to be forgotten")</li>
                  <li>Restrict processing</li>
                  <li>Object to processing, including direct marketing</li>
                  <li>Data portability (receive your data in machine-readable format)</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p>You also have the right to lodge a complaint with a supervisory authority.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">11. Children's Privacy</h2>
                <p>
                  Our services are not directed at children under 16, and we do not knowingly collect personal data from them.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-semibold mb-4">12. Contact Us</h2>
                <p className="mb-4">
                  If you have questions about this Privacy Information Statement or wish to exercise your rights:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Data Protection Officer (DPO)</strong></p>
                  <p><strong>Email:</strong> <a href="mailto:privacy@disruptinc.com" className="text-blue-600 hover:underline">privacy@disruptinc.com</a></p>
                  <p><strong>Address:</strong> [Address to be provided]</p>
                  <p className="mt-2 text-sm">For EU/EEA residents, you may also contact your local supervisory authority.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">13. Updates to This Statement</h2>
                <p>
                  We may update this statement to reflect legal, technical, or business changes. We encourage you to review it periodically.
                </p>
              </section>
            </div>
          </div>
      </div>
    </PageLayout>
  )
}

export default PrivacyPolicy