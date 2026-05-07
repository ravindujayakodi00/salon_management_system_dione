'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    className?: string;
}

// Strip country code prefix and return only the 9-digit local number
function extractLocalNumber(value: string): string {
    const digits = value.replace(/\D/g, '');
    if (digits.startsWith('94') && digits.length >= 11) {
        return digits.slice(2); // remove 94
    }
    if (digits.startsWith('0') && digits.length >= 10) {
        return digits.slice(1); // remove leading 0
    }
    if (digits.length === 9) {
        return digits;
    }
    // best-effort: return whatever digits are left (trimmed to 9)
    return digits.slice(0, 9);
}

export default function PhoneInput({
    value,
    onChange,
    label,
    placeholder = '701234567',
    required = false,
    disabled = false,
    error,
    className,
}: PhoneInputProps) {
    const [localNumber, setLocalNumber] = useState('');

    // Parse incoming value once on mount / when controlled value changes externally
    useEffect(() => {
        if (value) {
            setLocalNumber(extractLocalNumber(value));
        } else {
            setLocalNumber('');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only digits, strip leading 0, max 9 digits
        let digits = e.target.value.replace(/\D/g, '');
        if (digits.startsWith('0')) digits = digits.slice(1);
        digits = digits.slice(0, 9);
        setLocalNumber(digits);
        onChange(digits ? `+94${digits}` : '');
    };

    return (
        <div className={cn('w-full', className)}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {label}
                    {required && <span className="text-danger-500 ml-1">*</span>}
                </label>
            )}
            <div className="flex">
                {/* Fixed +94 prefix */}
                <span className={cn(
                    'flex items-center px-3 py-2.5 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-xl text-sm font-medium text-gray-700 dark:text-gray-300 select-none',
                    error && 'border-danger-500',
                    disabled && 'opacity-50',
                )}>
                    🇱🇰 +94
                </span>

                {/* 9-digit input */}
                <input
                    type="tel"
                    value={localNumber}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    maxLength={9}
                    inputMode="numeric"
                    className={cn(
                        'flex-1 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-r-xl',
                        'focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors',
                        'text-gray-900 dark:text-white placeholder-gray-400',
                        disabled && 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700',
                        error && 'border-danger-500 focus:ring-danger-500 focus:border-danger-500',
                    )}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-danger-500">{error}</p>
            )}
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Enter 9 digits after +94 (e.g. 701234567)
            </p>
        </div>
    );
}

// Helper to format phone for display (e.g., +94 77 123 4567)
export function formatPhoneDisplay(phone: string): string {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    if (digits.startsWith('94') && digits.length === 11) {
        const local = digits.slice(2);
        return `+94 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5)}`;
    }
    return phone;
}
