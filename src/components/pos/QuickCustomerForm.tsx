'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';

interface QuickCustomerFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (customerData: {
        name: string;
        phone: string;
        email?: string;
        gender?: string;
    }) => void;
    initialPhone?: string;
}

// Phone validation: always +94 + exactly 9 digits
const validatePhone = (digits: string): { isValid: boolean; message: string } => {
    if (digits.length === 0) return { isValid: false, message: 'Phone number is required' };
    if (digits.length < 9) return { isValid: false, message: `${9 - digits.length} more digit${9 - digits.length > 1 ? 's' : ''} needed` };
    return { isValid: true, message: 'Valid number' };
};

// Extract 9-digit local number from any format
function extractLocalDigits(value: string): string {
    const digits = value.replace(/\D/g, '');
    if (digits.startsWith('94') && digits.length >= 11) return digits.slice(2, 11);
    if (digits.startsWith('0')) return digits.slice(1, 10);
    return digits.slice(0, 9);
}

export default function QuickCustomerForm({
    isOpen,
    onClose,
    onSubmit,
    initialPhone = ''
}: QuickCustomerFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        phoneDigits: extractLocalDigits(initialPhone),
        email: '',
        gender: ''
    });

    // Update phone when initialPhone changes
    useEffect(() => {
        if (initialPhone) {
            setFormData(prev => ({ ...prev, phoneDigits: extractLocalDigits(initialPhone) }));
        }
    }, [initialPhone]);

    const phoneValidation = validatePhone(formData.phoneDigits);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !phoneValidation.isValid) {
            return;
        }

        onSubmit({
            name: formData.name.trim(),
            phone: `+94${formData.phoneDigits}`,
            email: formData.email.trim() || undefined,
            gender: formData.gender || undefined
        });

        // Reset form
        setFormData({ name: '', phoneDigits: '', email: '', gender: '' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Create Walk-in Customer
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Name - Required */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Customer Name <span className="text-danger-500">*</span>
                        </label>
                        <Input
                            type="text"
                            placeholder="Enter customer name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            autoFocus
                        />
                    </div>

                    {/* Phone - Required */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone Number <span className="text-danger-500">*</span>
                        </label>
                        <div className="flex">
                            <span className="flex items-center px-3 py-2.5 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-xl text-sm font-medium text-gray-700 dark:text-gray-300 select-none whitespace-nowrap">
                                🇱🇰 +94
                            </span>
                            <div className="relative flex-1">
                                <input
                                    type="tel"
                                    placeholder="701234567"
                                    value={formData.phoneDigits}
                                    onChange={(e) => {
                                        let digits = e.target.value.replace(/\D/g, '');
                                        if (digits.startsWith('0')) digits = digits.slice(1);
                                        setFormData({ ...formData, phoneDigits: digits.slice(0, 9) });
                                    }}
                                    required
                                    maxLength={9}
                                    inputMode="numeric"
                                    className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-r-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-gray-900 dark:text-white placeholder-gray-400 ${
                                        formData.phoneDigits.length > 0
                                            ? phoneValidation.isValid
                                                ? 'border-success-500 focus:ring-success-500'
                                                : 'border-danger-500 focus:ring-danger-500'
                                            : ''
                                    }`}
                                />
                                {formData.phoneDigits.length > 0 && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        {phoneValidation.isValid ? (
                                            <CheckCircle className="h-5 w-5 text-success-500" />
                                        ) : (
                                            <AlertCircle className="h-5 w-5 text-danger-500" />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        {formData.phoneDigits.length > 0 && (
                            <p className={`text-xs mt-1 ${phoneValidation.isValid ? 'text-success-600' : 'text-danger-600'}`}>
                                {phoneValidation.message}
                            </p>
                        )}
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Enter 9 digits after +94</p>
                    </div>

                    {/* Email - Optional */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email <span className="text-gray-400 text-xs">(Optional)</span>
                        </label>
                        <Input
                            type="email"
                            placeholder="customer@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    {/* Gender - Optional */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Gender <span className="text-gray-400 text-xs">(Optional)</span>
                        </label>
                        <select
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                        >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex-1"
                            disabled={!formData.name.trim() || !phoneValidation.isValid}
                        >
                            Create Customer
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
