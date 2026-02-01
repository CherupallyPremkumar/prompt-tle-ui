import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout/Layout';
import { PromptDetail } from '@/pages/promptdetail/index';
import { AskPrompt } from '@/pages/askprompt/index';
import { Tags } from './pages/tags';
import { Users } from './pages/users';
import { Profile } from '@/pages/profile/index';
import { OAuthCallback } from './pages/auth/OAuthCallback';
import { Home } from "@/pages/home/index";
import { ErrorBoundary } from './components/common/ErrorBoundary';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={
                    <ErrorBoundary>
                        <Home />
                    </ErrorBoundary>
                } />
                <Route path="prompts" element={<Home />} />
                <Route path="prompts/:id" element={<PromptDetail />} />
                <Route path="ask" element={<AskPrompt />} />
                <Route path="tags" element={<Tags />} />
                <Route path="users" element={<Users />} />
                <Route path="tags/:tag" element={<Home />} />
                <Route path="users/:id" element={<Profile />} />
                <Route path="auth/callback" element={<OAuthCallback />} />
            </Route>
        </Routes>
    );
}

export default App;
