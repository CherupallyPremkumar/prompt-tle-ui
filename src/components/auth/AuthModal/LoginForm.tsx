import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { useAuthStore } from '../../../store/auth.store';
import { authService } from '../../../services/auth.service';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
    onSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const { login, setLoading, setError, error } = useAuthStore();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (_data: LoginFormValues) => {
        try {
            setLoading(true);
            // In a real app, you'd call a login API here
            // For now, let's assume getCurrentUser works after some login action
            // Or we just mock it if the backend isn't ready for password auth
            const user = await authService.getCurrentUser();
            login(user);
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.description || 'Login failed');
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
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
        </form>
    );
};
