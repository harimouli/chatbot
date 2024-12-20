import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/Login';
import NotFound  from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import BotHome from './components/BotHome';
const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
                <ProtectedRoute>
                    <BotHome />
                </ProtectedRoute>
            } />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
    </BrowserRouter>
)

export default App;