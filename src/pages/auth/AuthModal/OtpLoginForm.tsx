import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { authService } from '../../../services/auth.service';
import toast from 'react-hot-toast';
import { logger } from '@/utils/logger';
import { ArrowLeft, Mail, Shield } from 'lucide-react';

const emailSchema = z.object({
    email: z.string().email('Invalid email address'),
});

const otpSchema = z.object({
    code: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must contain only numbers'),
});

type EmailFormValues = z.infer<typeof emailSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

type FlowStep = 'EMAIL' | 'OTP';

interface OtpLoginFormProps {
    onSuccess: () => void;
}

export const OtpLoginForm: React.FC<OtpLoginFormProps> = ({ onSuccess }) => {
    const [step, setStep] = useState<FlowStep>('EMAIL');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [resendTimer, setResendTimer] = useState(0);
    const [isResending, setIsResending] = useState(false);

    // Email form
    const emailForm = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
    });

    // OTP form
    const otpForm = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
    });

    // Countdown timer for resend
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const handleEmailSubmit = async (data: EmailFormValues) => {
        try {
            setError(null);
            logger.debug('[OtpLoginForm] Sending OTP to email', { email: data.email });

            await authService.sendOtp(data.email);

            setEmail(data.email);
            setStep('OTP');
            setResendTimer(60); // 60 second cooldown
            toast.success('OTP sent to your email!');
            logger.info('[OtpLoginForm] OTP sent successfully');
        } catch (err: any) {
            logger.error('[OtpLoginForm] Failed to send OTP', err);

            // Handle rate limiting
            if (err.response?.status === 429) {
                const retryAfter = err.response?.headers['retry-after'] || 60;
                setError(`Too many requests. Please wait ${retryAfter} seconds.`);
                toast.error(`Please wait ${retryAfter} seconds before trying again.`);
            } else {
                const errorMessage = err.response?.data?.description || 'Failed to send OTP. Please try again.';
                setError(errorMessage);
                toast.error(errorMessage);
            }
        }
    };

    const handleOtpSubmit = async (data: OtpFormValues) => {
        try {
            setError(null);
            logger.debug('[OtpLoginForm] Verifying OTP');

            const response = await authService.verifyOtp(email, data.code);

            if (response.user) {
                logger.info('[OtpLoginForm] OTP verification successful');
                toast.success(`Welcome, ${response.user.username || response.user.email}!`);
                onSuccess();
            }
        } catch (err: any) {
            logger.error('[OtpLoginForm] OTP verification failed', err);

            const errorMessage = err.response?.data?.description ||
                err.response?.status === 400 ? 'Invalid or expired OTP' :
                'Verification failed. Please try again.';

            setError(errorMessage);
            toast.error(errorMessage);

            // Clear the OTP input on error
            otpForm.reset();
        }
    };

    const handleResendOtp = async () => {
        if (resendTimer > 0 || isResending) return;

        try {
            setIsResending(true);
            setError(null);
            logger.debug('[OtpLoginForm] Resending OTP');

            await authService.sendOtp(email);

            setResendTimer(60);
            toast.success('New OTP sent!');
            logger.info('[OtpLoginForm] OTP resent successfully');
        } catch (err: any) {
            logger.error('[OtpLoginForm] Failed to resend OTP', err);

            if (err.response?.status === 429) {
                const retryAfter = err.response?.headers['retry-after'] || 60;
                toast.error(`Please wait ${retryAfter} seconds before trying again.`);
            } else {
                toast.error('Failed to resend OTP. Please try again.');
            }
        } finally {
            setIsResending(false);
        }
    };

    const handleBackToEmail = () => {
        setStep('EMAIL');
        setError(null);
        otpForm.reset();
    };

    if (step === 'EMAIL') {
        return (
            <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4 py-4">
                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-medium text-left block flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                    </label>
                    <Input
                        {...emailForm.register('email')}
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        autoFocus
                        disabled={emailForm.formState.isSubmitting}
                    />
                    {emailForm.formState.errors.email && (
                        <p className="text-xs text-red-600 text-left">
                            {emailForm.formState.errors.email.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={emailForm.formState.isSubmitting}
                >
                    {emailForm.formState.isSubmitting ? 'Sending...' : 'Continue with Email'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                    We'll send you a one-time password to verify your email
                </p>
            </form>
        );
    }

    // OTP Step
    return (
        <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-4 py-4">
            {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-left flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Enter OTP
                    </label>
                    <button
                        type="button"
                        onClick={handleBackToEmail}
                        className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                        <ArrowLeft className="w-3 h-3" />
                        Edit Email
                    </button>
                </div>

                <p className="text-sm text-gray-600">
                    We sent a 6-digit code to <strong>{email}</strong>
                </p>

                <Input
                    {...otpForm.register('code')}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    placeholder="000000"
                    autoComplete="one-time-code"
                    autoFocus
                    disabled={otpForm.formState.isSubmitting}
                    className="text-center text-2xl tracking-widest font-mono"
                />
                {otpForm.formState.errors.code && (
                    <p className="text-xs text-red-600 text-left">
                        {otpForm.formState.errors.code.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={otpForm.formState.isSubmitting}
            >
                {otpForm.formState.isSubmitting ? 'Verifying...' : 'Verify & Sign In'}
            </Button>

            <div className="text-center">
                {resendTimer > 0 ? (
                    <p className="text-sm text-gray-500">
                        Resend code in <strong>{resendTimer}s</strong>
                    </p>
                ) : (
                    <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isResending}
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium disabled:opacity-50"
                    >
                        {isResending ? 'Sending...' : 'Resend OTP'}
                    </button>
                )}
            </div>
        </form>
    );
};
