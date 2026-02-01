import { useState, useEffect } from 'react';
import { mockDataService, mockPrompts } from '@/mocks/mockData';
import { Prompt, User } from "@/types";
import { logger } from '@/utils/logger';


export const useProfileData = (userId?: string) => {
    const [user, setUser] = useState<User | null>(null);
    const [userPrompts, setUserPrompts] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            loadUserProfile();
        }
    }, [userId]);

    const loadUserProfile = async () => {
        setLoading(true);
        try {
            const userData = await mockDataService.getUserById(userId!);
            setUser(userData);

            // Get user's prompts
            const prompts = mockPrompts.filter(p => p.userId === userId);
            setUserPrompts(prompts);
        } catch (error) {
            logger.error('Error loading user profile', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate total answers
    const totalAnswers = mockPrompts.reduce((sum, p) =>
        sum + p.answers.filter(a => a.userId === userId).length, 0
    );

    // Calculate total votes
    const totalVotes = userPrompts.reduce((sum, p) => sum + p.score, 0);

    return {
        user,
        userPrompts,
        loading,
        totalAnswers,
        totalVotes,
    };
};