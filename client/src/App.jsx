import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost } from './pages';

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <header className="w-full sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center sm:px-8 px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
            <span className="font-semibold text-slate-800">AI Image Generator</span>
          </Link>

          <Link
            to="/create-post"
            className="btn-primary"
          >
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
