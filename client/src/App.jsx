import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost } from './pages';

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <header className="w-full sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center sm:px-8 px-4 py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
              <img src={logo} alt="logo" className="w-6 h-6 object-contain filter brightness-0 invert" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Image Generator
            </span>
          </Link>

          <Link
            to="/create-post"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create
          </Link>
        </div>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
};

export default App;
