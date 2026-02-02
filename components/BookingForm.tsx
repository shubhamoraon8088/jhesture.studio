
import React, { useState, useEffect } from 'react';

interface BookingFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        country: '',
        service: '',
        budget: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    // Detect theme changes
    useEffect(() => {
        const updateTheme = () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light';
            setTheme(currentTheme || 'dark');
        };

        updateTheme();

        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return () => observer.disconnect();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
                    name: formData.name,
                    email: formData.email,
                    country: formData.country,
                    service: formData.service,
                    budget: formData.budget,
                    message: formData.message,
                    subject: `New Booking Request from ${formData.name}`
                })
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                setTimeout(() => {
                    onClose();
                    setFormData({ name: '', email: '', country: '', service: '', budget: '', message: '' });
                    setSubmitStatus('idle');
                }, 2000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    // Theme-based colors
    const colors = theme === 'light'
        ? {
            bg: '#ffffff',
            borderColor: 'rgba(0, 0, 0, 0.2)',
            inputBg: '#f1ede9',
            inputText: '#0a0a0a',
            labelText: '#666666',
            placeholderText: '#999999'
        }
        : {
            bg: '#1a1a1a',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            inputBg: '#0a0a0a',
            inputText: '#ffffff',
            labelText: '#a3a3a3',
            placeholderText: '#666666'
        };

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000] flex items-center justify-center p-4 animate-fadeIn cursor-auto"
            onClick={onClose}
        >
            <div
                className="border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12 relative animate-slideUp cursor-auto"
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: colors.bg,
                    borderColor: colors.borderColor
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 hover:opacity-70 transition-opacity text-2xl cursor-pointer"
                    style={{ color: colors.inputText }}
                >
                    ×
                </button>

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-4xl md:text-5xl font-serif mb-3" style={{ color: colors.inputText }}>
                        Let's <span className="italic">Collaborate</span>
                    </h2>
                    <p className="text-sm" style={{ color: colors.labelText }}>
                        Fill out the form below and I'll get back to you within 24 hours.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 cursor-auto">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm uppercase tracking-wider mb-2" style={{ color: colors.labelText }}>
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded px-4 py-3 focus:outline-none transition-colors cursor-text"
                            placeholder="John Doe"
                            style={{
                                backgroundColor: colors.inputBg,
                                borderColor: colors.borderColor,
                                color: colors.inputText
                            }}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm uppercase tracking-wider mb-2" style={{ color: colors.labelText }}>
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded px-4 py-3 focus:outline-none transition-colors cursor-text"
                            placeholder="john@example.com"
                            style={{
                                backgroundColor: colors.inputBg,
                                borderColor: colors.borderColor,
                                color: colors.inputText
                            }}
                        />
                    </div>

                    {/* Country */}
                    <div>
                        <label htmlFor="country" className="block text-sm uppercase tracking-wider mb-2" style={{ color: colors.labelText }}>
                            Country *
                        </label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            required
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full border rounded px-4 py-3 focus:outline-none transition-colors cursor-text"
                            placeholder="United States"
                            style={{
                                backgroundColor: colors.inputBg,
                                borderColor: colors.borderColor,
                                color: colors.inputText
                            }}
                        />
                    </div>

                    {/* Service */}
                    <div>
                        <label htmlFor="service" className="block text-sm uppercase tracking-wider mb-2" style={{ color: colors.labelText }}>
                            Service Needed *
                        </label>
                        <select
                            id="service"
                            name="service"
                            required
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full border rounded px-4 py-3 focus:outline-none transition-colors cursor-pointer"
                            style={{
                                backgroundColor: colors.inputBg,
                                borderColor: colors.borderColor,
                                color: colors.inputText
                            }}
                        >
                            <option value="">Select a service...</option>
                            <option value="Wedding & Event Cinema">Wedding & Event Cinema</option>
                            <option value="Social-First Content">Social-First Content</option>
                            <option value="Brand Commercials">Brand Commercials</option>
                            <option value="Custom Project">Custom Project</option>
                        </select>
                    </div>

                    {/* Budget */}
                    <div>
                        <label htmlFor="budget" className="block text-sm uppercase tracking-wider mb-2" style={{ color: colors.labelText }}>
                            Your Budget *
                        </label>
                        <input
                            type="text"
                            id="budget"
                            name="budget"
                            required
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full border rounded px-4 py-3 focus:outline-none transition-colors cursor-text"
                            placeholder="$5,000 or your budget range"
                            style={{
                                backgroundColor: colors.inputBg,
                                borderColor: colors.borderColor,
                                color: colors.inputText
                            }}
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block text-sm uppercase tracking-wider mb-2" style={{ color: colors.labelText }}>
                            Project Details
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full border rounded px-4 py-3 focus:outline-none transition-colors resize-none cursor-text"
                            placeholder="Tell me about your project..."
                            style={{
                                backgroundColor: colors.inputBg,
                                borderColor: colors.borderColor,
                                color: colors.inputText
                            }}
                        />
                    </div>

                    {/* Submit Status Messages */}
                    {submitStatus === 'success' && (
                        <div className="bg-green-500/10 border border-green-500/30 rounded px-4 py-3 text-green-400 text-sm">
                            ✓ Thank you! Your booking request has been submitted successfully.
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded px-4 py-3 text-red-400 text-sm">
                            ✗ Something went wrong. Please try again or email directly.
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full font-serif text-lg py-4 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        style={{
                            backgroundColor: theme === 'light' ? '#0a0a0a' : '#ffffff',
                            color: theme === 'light' ? '#ffffff' : '#0a0a0a'
                        }}
                    >
                        {isSubmitting ? 'Submitting...' : 'Send Booking Request'}
                    </button>
                </form>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default BookingForm;
