import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ChatProvider } from './context/ChatContext';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import MythBuster from './pages/MythBuster';
import Quiz from './pages/Quiz';
import Chat from './pages/Chat';

function App() {
  return (
    <AppProvider>
      <ChatProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="timeline" element={<Timeline />} />
              <Route path="mythbuster" element={<MythBuster />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="chat" element={<Chat />} />
            </Route>
          </Routes>
        </Router>
      </ChatProvider>
    </AppProvider>
  );
}

export default App;
