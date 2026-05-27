import { useEffect, useState } from 'react';
import { useAppStore } from './store';
import { LoadingScreen } from './components/LoadingScreen';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { AdminPanel } from './components/AdminPanel';
import { Moon, Sun, LogOut, Crown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Beautiful N logo — crystalline gem shape
function NLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1"/>
          <stop offset="50%" stopColor="#8b5cf6"/>
          <stop offset="100%" stopColor="#a855f7"/>
        </linearGradient>
        <linearGradient id="shineTop" x1="0" y1="0" x2="0" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.30"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0"/>
        </linearGradient>
        <linearGradient id="edgeLight" x1="0" y1="0" x2="40" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18"/>
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.0"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      {/* Octagonal gem shape */}
      <path
        d="M14 3 L26 3 L37 14 L37 26 L26 37 L14 37 L3 26 L3 14 Z"
        fill="url(#bgGrad)"
      />
      {/* Top shine facet */}
      <path
        d="M14 3 L26 3 L37 14 L20 14 L3 14 Z"
        fill="url(#shineTop)"
      />
      {/* Edge highlights */}
      <path
        d="M14 3 L26 3 L37 14 L37 26 L26 37 L14 37 L3 26 L3 14 Z"
        fill="url(#edgeLight)"
      />
      {/* Inner facet lines — gem cut */}
      <path d="M14 3 L20 14 L3 14" stroke="white" strokeOpacity="0.12" strokeWidth="0.5"/>
      <path d="M26 3 L20 14 L37 14" stroke="white" strokeOpacity="0.12" strokeWidth="0.5"/>
      <path d="M37 26 L20 26 L37 14" stroke="white" strokeOpacity="0.08" strokeWidth="0.5"/>
      {/* N letterform — bold geometric */}
      <path
        d="M12 28V12h2.8l9.4 11.2V12H27v16h-2.8L14.8 16.8V28H12z"
        fill="white"
        filter="url(#glow)"
      />
      {/* Tiny corner gem accent */}
      <circle cx="33" cy="7" r="1.8" fill="white" fillOpacity="0.5"/>
      <circle cx="7" cy="33" r="1.2" fill="white" fillOpacity="0.25"/>
    </svg>
  );
}

function App() {
  const {
    theme, toggleTheme,
    currentUser, logout,
    initRealtimeListeners, restoreSession,
    dbReady,
  } = useAppStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    restoreSession();
    const unsub = initRealtimeListeners();
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => { unsub(); clearTimeout(timer); };
  }, []);

  useEffect(() => {
    if (dbReady) {
      const t = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(t);
    }
  }, [dbReady]);

  const isPremium = currentUser?.role === 'premium';
  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 transition-colors duration-300 font-sans">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col min-h-screen"
          >
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md border-b border-neutral-200/70 dark:border-neutral-800/70">
              <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="relative shrink-0 drop-shadow-lg">
                    <NLogo size={34} />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="font-black text-sm sm:text-base tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Nnevv</span>
                    <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-neutral-400">Feature</span>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={toggleTheme}
                    className="p-1.5 sm:p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>

                  {currentUser && (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="hidden sm:flex items-center gap-2">
                        <span className="text-sm font-medium max-w-[120px] truncate">{currentUser.username}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${
                          isAdmin
                            ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400'
                            : isPremium
                              ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400'
                              : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                        }`}>
                          {isPremium && <Crown className="w-2.5 h-2.5 inline mr-0.5" />}
                          {currentUser.role}
                        </span>
                      </div>
                      <button
                        onClick={logout}
                        className="p-1.5 sm:p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 dark:text-red-400 transition-colors"
                        title="Logout"
                      >
                        <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Main */}
            <main className="flex-1 pt-14 sm:pt-16 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px]" />
              </div>

              <div className="flex-1 w-full max-w-4xl mx-auto p-3 sm:p-5 lg:p-8 flex flex-col">
                {!currentUser ? (
                  <Landing />
                ) : isAdmin ? (
                  <AdminPanel />
                ) : (
                  <Dashboard />
                )}
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
