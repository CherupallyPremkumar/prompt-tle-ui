import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { useAuthStore } from '../../../store/auth.store';

const signupSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
    onSuccess: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
    const { setLoading, setError, error } = useAuthStore();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (_data: SignupFormValues) => {
        try {
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                    {error}
                </div>
            )}
            <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <Input
                    {...register('username')}
                    placeholder="johndoe"
                />
                {errors.username && (
                    <p className="text-xs text-destructive">{errors.username.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                    {...register('email')}
                    type="email"
                    placeholder="email@example.com"
                />
                {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                    {...register('password')}
                    type="password"
                    placeholder="••••••••"
                />
                {errors.password && (
                    <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <Input
                    {...register('confirmPassword')}
                    type="password"
                    placeholder="••••••••"
                />
                {errors.confirmPassword && (
                    <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Creating account...' : 'Create Account'}
            </Button>
        </form>
    );
};
