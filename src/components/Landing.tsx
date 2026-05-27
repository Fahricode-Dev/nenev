import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { User, ShieldAlert, ArrowRight, Lock, Key, Eye, EyeOff, Package, Crown, Zap } from 'lucide-react';

// Animated floating orb
function FloatOrb({ className }: { className: string }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      animate={{ y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export function Landing() {
  const [view, setView] = useState<'selection' | 'member' | 'admin'>('selection');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminKey, setShowAdminKey] = useState(false);

  const login = useAppStore(state => state.login);

  const handleLogin = async (e: React.FormEvent, isAdmin: boolean) => {
    e.preventDefault();
    setError('');
    const success = await login(isAdmin ? 'admin' : username, password, isAdmin);
    if (!success) {
      setError(isAdmin ? 'Admin password salah' : 'Username atau password salah');
    }
  };

  const goBack = () => { setView('selection'); setError(''); setPassword(''); setUsername(''); };

  const fade = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.25 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.08 } }
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100dvh-56px)] sm:min-h-[calc(100vh-64px)] px-3 sm:px-4 py-6 relative overflow-hidden">

      {/* Background orbs */}
      <FloatOrb className="w-72 h-72 sm:w-96 sm:h-96 bg-indigo-500/15 blur-[80px] top-[-10%] left-[-15%]" />
      <FloatOrb className="w-64 h-64 sm:w-80 sm:h-80 bg-purple-500/12 blur-[80px] bottom-[-5%] right-[-10%]" />
      <FloatOrb className="w-48 h-48 bg-blue-500/10 blur-[60px] top-[40%] right-[10%]" />

      <AnimatePresence mode="wait">

        {/* ── SELECTION ── */}
        {view === 'selection' && (
          <motion.div
            key="selection"
            variants={{ ...fade, ...stagger }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-xl"
          >
            {/* Hero text */}
            <motion.div variants={item} className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-5">
                <Zap size={10} /> WhatsApp Bot Store
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 sm:mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400">
                  Gudang Nevano
                </span>
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
                Koleksi fitur eksklusif untuk bot WhatsApp kamu — plugin, script, dan kode siap pakai.
              </p>
            </motion.div>

            {/* Feature pills */}
            <motion.div variants={item} className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
              {[
                { icon: <Package size={11} />, label: 'Kode Gratis', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
                { icon: <Crown size={11} />, label: 'Premium Eksklusif', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                { icon: <Zap size={11} />, label: 'Update Rutin', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
              ].map(f => (
                <span key={f.label} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${f.color}`}>
                  {f.icon} {f.label}
                </span>
              ))}
            </motion.div>

            {/* Login cards */}
            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Member */}
              <motion.button
                onClick={() => setView('member')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-2xl p-5 sm:p-6 text-left transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.05) 100%)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  boxShadow: '0 0 0 0 rgba(99,102,241,0)'
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 100%)' }} />
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"
                  style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-indigo-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <User size={20} className="text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-black mb-1">Login Member</h2>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">Akses dashboard & semua fitur kamu.</p>
                  <div className="flex items-center gap-1 mt-3 text-indigo-400 text-xs font-semibold">
                    Masuk <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.button>

              {/* Admin */}
              <motion.button
                onClick={() => setView('admin')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-2xl p-5 sm:p-6 text-left transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.07) 0%, rgba(236,72,153,0.04) 100%)',
                  border: '1px solid rgba(168,85,247,0.18)',
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(236,72,153,0.07) 100%)' }} />
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"
                  style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }} />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <ShieldAlert size={20} className="text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-black mb-1">Login Admin</h2>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">Kelola users, kode & platform.</p>
                  <div className="flex items-center gap-1 mt-3 text-purple-400 text-xs font-semibold">
                    Masuk <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* ── MEMBER LOGIN ── */}
        {view === 'member' && (
          <motion.div key="member" variants={fade} initial="hidden" animate="visible" exit="exit" className="w-full max-w-sm sm:max-w-md">
            <div className="bg-white/65 dark:bg-neutral-900/65 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/50 dark:border-neutral-800/50 shadow-2xl shadow-black/5 overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-600" />
              <div className="p-6 sm:p-8">
                <div className="mb-6 sm:mb-7">
                  <button onClick={goBack} className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors mb-4 flex items-center gap-1">
                    ← Kembali
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/30">
                      <User size={18} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black">Member Portal</h2>
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">Selamat datang kembali!</p>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="mb-4 px-3 py-2.5 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800/50">
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={(e) => handleLogin(e, false)} className="space-y-3.5 sm:space-y-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Username</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400"><User size={15} /></div>
                      <input type="text" required value={username} onChange={e => setUsername(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 outline-none transition-all"
                        placeholder="Masukkan username" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400"><Lock size={15} /></div>
                      <input type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 outline-none transition-all"
                        placeholder="Masukkan password" />
                      <button type="button" onClick={() => setShowPassword(v => !v)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors">
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit"
                    className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] mt-2">
                    Masuk
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── ADMIN LOGIN ── */}
        {view === 'admin' && (
          <motion.div key="admin" variants={fade} initial="hidden" animate="visible" exit="exit" className="w-full max-w-sm sm:max-w-md">
            <div className="bg-white/65 dark:bg-neutral-900/65 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/50 dark:border-neutral-800/50 shadow-2xl shadow-black/5 overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-pink-500" />
              <div className="p-6 sm:p-8">
                <div className="mb-6 sm:mb-7">
                  <button onClick={goBack} className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors mb-4 flex items-center gap-1">
                    ← Kembali
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md shadow-purple-500/30">
                      <ShieldAlert size={18} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black">Admin Portal</h2>
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">Hanya untuk yang berwenang.</p>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="mb-4 px-3 py-2.5 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800/50">
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={(e) => handleLogin(e, true)} className="space-y-3.5 sm:space-y-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Secret Key</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400"><Key size={15} /></div>
                      <input type={showAdminKey ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 outline-none transition-all"
                        placeholder="Masukkan admin passcode" />
                      <button type="button" onClick={() => setShowAdminKey(v => !v)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors">
                        {showAdminKey ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1.5 ml-0.5">Memerlukan NEV master passcode untuk akses.</p>
                  </div>

                  <button type="submit"
                    className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-[0.99] mt-2">
                    Authenticate
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
