import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { PromptDetail } from './pages/PromptDetail';
import { AskPrompt } from './pages/AskPrompt';
import { Tags } from './pages/Tags';
import { Users } from './pages/Users';
import { Profile } from './pages/Profile';
import { OAuthCallback } from './components/auth/OAuthCallback';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
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
