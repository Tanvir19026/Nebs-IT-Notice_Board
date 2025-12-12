import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NoticeBoardPage from './pages/NoticeBoardPage';
import CreateNoticePage from './pages/CreateNoticePage';
import NoticeDetailsPage from './pages/NoticeDetailsPage';
import EditNoticePage from './pages/EditNoticePage';
import PageUnderConstruction from './pages/PageUnderConstruction';

import { useState } from 'react';

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-[#f8f9fc] min-h-screen relative">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-4 md:p-6 overflow-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/notice-board" replace />} />
          <Route path="/notice-board" element={<NoticeBoardPage />} />
          <Route path="/notice-board/create" element={<CreateNoticePage />} />
          <Route path="/notice-board/:id" element={<NoticeDetailsPage />} />
          <Route path="/notice-board/edit/:id" element={<EditNoticePage />} />
          <Route path="*" element={<PageUnderConstruction />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
