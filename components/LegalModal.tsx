
import React from 'react';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'privacy' | 'terms';
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
    if (!isOpen) return null;

    const content = type === 'privacy' ? (
        <>
            <h2 className="text-3xl md:text-4xl font-serif mb-8">Privacy Policy</h2>
            <p className="text-brand-muted mb-4 text-sm">Last updated: February 2025</p>

            <div className="space-y-6 text-brand-muted">
                <section>
                    <h3 className="text-xl font-serif text-brand-white mb-3">1. Information We Collect</h3>
                    <p className="leading-relaxed">
                        When you contact us through our website, we collect information you provide directly, including:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Name and contact information (email, phone number)</li>
                        <li>Project details and requirements you share</li>
                        <li>Any files or references you provide</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-serif text-brand-white mb-3">2. How We Use Your Information</h3>
                    <p className="leading-relaxed">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Respond to your inquiries and provide quotes</li>
                        <li>Communicate about projects and services</li>
                        <li>Deliver video editing services you request</li>
                        <li>Send updates about project progress</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-serif text-brand-white mb-3">3. Third-Party Services</h3>
                    <p className="leading-relaxed">
                        We may use third-party services to facilitate communication:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>WhatsApp for messaging</li>
                        <li>Gmail for email communication</li>
                        <li>Instagram and LinkedIn for social engagement</li>
                    </ul>
                    <p className="mt-2 leading-relaxed">
                        These services have their own privacy policies that govern how they handle your data.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-serif text-brand-white mb-3">4. Data Security</h3>
                    <p className="leading-relaxed">
                        We take reasonable measures to protect your personal information from unauthorized access,
                        alteration, or destruction. However, no method of transmission over the internet is 100% secure.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-serif text-brand-white mb-3">5. Data Retention</h3>
                    <p className="leading-relaxed">
                        We retain your contact information for as long as necessary to fulfill the purposes outlined
                        in this policy, or as required by law. You may request deletion of your data at any time.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-serif text-brand-white mb-3">6. Your Rights</h3>
                    <p className="leading-relaxed">You have the right to:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Access the personal data we hold about you</li>
                        <li>Request correction of inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Withdraw consent at any time</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-serif text-brand-white mb-3">7. Contact Us</h3>
                    <p className="leading-relaxed">
                        If you have questions about this Privacy Policy, please contact us at:
                    </p>
                    <p className="mt-2">
                        <strong className="text-brand-white">Email:</strong> shubhamoraon8088@gmail.com<br />
                        <strong className="text-brand-white">WhatsApp:</strong> +91 9835813059
                    </p>
                </section>
            </div>
        </>
    ) : (
        <>
            <h2 className="text-3xl md:text-4xl font-serif mb-8">Terms of Use</h2>
            <p className="text-brand-muted mb-4 text-sm">Last updated: February 2025</p>

            <div className="space-y-6 text-brand-muted">
                <section>
                    <h3 className="text-xl font-serif text-brand-white mb-3">1. Acceptance of Terms</h3>
                    <p className="leading-relaxed">
                        By accessing and using the jhesture.studio website, you accept and agree to be bound by these
                        Terms of Use. If you do not agree to these terms, please do not use this website.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-serif text-brand-white mb-3">2. Intellectual Property</h3>
                    <p className="leading-relaxed">
                        All content on this website, including but not limited to videos, images, graphics, text,
                        and design elements, is the intellectual property of jhesture.studio unless otherwise noted.
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>You may view content for personal, non-commercial purposes</li>
                        <li>You may not download, copy, or redistribute any content without permission</li>
                        <li>Some portfolio work may be owned by respective clients</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-serif text-brand-white mb-3">3. Portfolio Disclaimer</h3>
                    <p className="leading-relaxed">
                        The portfolio showcased on this website is for demonstration purposes only. Some projects
                        displayed may be:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Client work displayed with permission</li>
                        <li>Personal projects and creative experiments</li>
                        <li>Collaborative work with other creators</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-serif text-brand-white mb-3">4. Service Inquiries</h3>
                    <p className="leading-relaxed">
                        Inquiries made through this website do not constitute a binding agreement. All project
                        agreements, pricing, and deliverables will be discussed and confirmed separately before
                        any work commences.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-serif text-brand-white mb-3">5. External Links</h3>
                    <p className="leading-relaxed">
                        This website may contain links to third-party websites (Instagram, LinkedIn, WhatsApp, etc.).
                        We are not responsible for the content, privacy policies, or practices of these external sites.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-serif text-brand-white mb-3">6. Limitation of Liability</h3>
                    <p className="leading-relaxed">
                        jhesture.studio shall not be liable for any damages arising from the use or inability to
                        use this website. This includes, but is not limited to, direct, indirect, incidental, or
                        consequential damages.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-serif text-brand-white mb-3">7. Changes to Terms</h3>
                    <p className="leading-relaxed">
                        We reserve the right to modify these Terms of Use at any time. Changes will be effective
                        immediately upon posting to the website. Your continued use of the website constitutes
                        acceptance of any changes.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-serif text-brand-white mb-3">8. Contact</h3>
                    <p className="leading-relaxed">
                        For questions regarding these Terms of Use, please contact:
                    </p>
                    <p className="mt-2">
                        <strong className="text-brand-white">Email:</strong> shubhamoraon8088@gmail.com<br />
                        <strong className="text-brand-white">WhatsApp:</strong> +91 9835813059
                    </p>
                </section>
            </div>
        </>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-brand-black border border-white/10 rounded-lg max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 text-brand-muted hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Content */}
                <div className="p-8 md:p-12 overflow-y-auto max-h-[85vh]">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default LegalModal;
