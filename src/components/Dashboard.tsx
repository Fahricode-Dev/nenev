import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import {
  Copy, Check, Lock, Code, Server, Plug,
  Search, Crown, Zap, Package, MessageCircle, ExternalLink,
  ChevronDown, Sparkles, Shield, Star
} from 'lucide-react';
import { cn } from '../lib/utils';

export function Dashboard() {
  const { currentUser, endpoints } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!currentUser) return null;

  const isPremium = currentUser.role === 'premium' || currentUser.role === 'admin';

  const filteredEndpoints = endpoints.filter(ep =>
    ep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ep.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'plugin': return <Plug size={17} />;
      case 'case':   return <Code size={17} />;
      case 'script': return <Zap size={17} />;
      default:       return <Server size={17} />;
    }
  };

  const waLink = `https://wa.me/819070424636?text=Halo%20kak%2C%20aku%20mau%20berlangganan%20Premium%20Gudang%20Nevano`;

  const freeCount = endpoints.filter(e => e.accessLevel === 'basic').length;
  const premiumCount = endpoints.filter(e => e.accessLevel === 'premium').length;

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">

      {/* ── HERO HEADER ── */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
        {/* Layered backgrounds */}
        <div className="absolute inset-0 bg-[#080b14]" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 110% -10%, rgba(99,102,241,0.5) 0%, transparent 60%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at -10% 110%, rgba(168,85,247,0.35) 0%, transparent 55%)'
        }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        {/* Glow blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.8) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, transparent 70%)' }} />

        <div className="relative z-10 p-5 sm:p-7 md:p-9">
          {/* Top section */}
          <div className="flex flex-col gap-5">
            {/* Brand + stats row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              {/* Brand */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                    <Package size={22} className="text-white sm:hidden" />
                    <Package size={26} className="text-white hidden sm:block" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-400 border-2 border-[#080b14]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-none">Gudang Nevano</h1>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-indigo-500/25 border border-indigo-400/30 text-indigo-300 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">v2.0</span>
                  </div>
                  <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">WhatsApp Bot Feature Store</p>
                </div>
              </div>

              {/* Premium status badge */}
              {isPremium ? (
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 self-start sm:self-auto shrink-0">
                  <div className="w-8 h-8 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/30">
                    <Crown size={15} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[9px] text-amber-300/70 uppercase tracking-wider font-semibold">Status</div>
                    <div className="text-xs sm:text-sm font-black text-amber-300">PREMIUM</div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Stats pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 bg-white/[0.06] backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <Package size={10} className="text-indigo-400" />
                <span className="text-white font-semibold">{freeCount}</span>
                <span>gratis</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 bg-white/[0.06] backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <Crown size={10} className="text-amber-400" />
                <span className="text-white font-semibold">{premiumCount}</span>
                <span>premium</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 bg-white/[0.06] backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <Sparkles size={10} className="text-purple-400" />
                <span className="text-white font-semibold">{endpoints.length}</span>
                <span>total fitur</span>
              </div>
            </div>

            {/* Upgrade card — only for basic users */}
            {!isPremium && (
              <div className="relative overflow-hidden rounded-xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur p-4">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-2xl rounded-full"
                  style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />
                <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                      <Shield size={14} className="text-white" />
                    </div>
                    <p className="text-white/75 text-xs sm:text-sm leading-snug">
                      Buka semua kode eksklusif & fitur advanced dengan <span className="text-white font-semibold">Premium</span>.
                    </p>
                  </div>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 shrink-0 py-2.5 px-5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Crown size={13} />
                    Upgrade Premium
                    <ExternalLink size={10} className="opacity-60 group-hover:opacity-100" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── SEARCH ── */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
          <Search size={15} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
          placeholder="Cari kode, plugin, script..."
        />
      </div>

      {/* ── CARDS ── */}
      <div className="grid gap-3 sm:gap-4">
        <AnimatePresence>
          {filteredEndpoints.map((endpoint, i) => {
            const isLocked   = endpoint.accessLevel === 'premium' && !isPremium;
            const isExpanded = expandedId === endpoint.id;
            const lines      = endpoint.codeSnippet?.split('\n') ?? [];
            const hasMore    = lines.length > 5;
            const displayCode = endpoint.codeSnippet;

            return (
              <motion.div
                key={endpoint.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  'bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border rounded-2xl overflow-hidden shadow-sm transition-shadow duration-300',
                  isLocked
                    ? 'border-amber-200 dark:border-amber-900/40'
                    : 'border-neutral-200 dark:border-neutral-800 hover:shadow-xl hover:shadow-indigo-500/10'
                )}
              >
                {/* Card header row */}
                <div className="p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={cn(
                      'w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md',
                      endpoint.accessLevel === 'premium'
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-amber-500/30'
                        : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-indigo-500/30'
                    )}>
                      {endpoint.accessLevel === 'premium' ? <Crown size={16} /> : getIcon(endpoint.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-sm leading-tight">{endpoint.name}</h3>
                        {endpoint.accessLevel === 'premium' ? (
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white uppercase tracking-wide whitespace-nowrap">✦ Premium</span>
                        ) : (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 uppercase tracking-wide whitespace-nowrap">Free</span>
                        )}
                        <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 uppercase tracking-wide whitespace-nowrap">
                          {endpoint.type}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">{endpoint.description}</p>
                    </div>
                  </div>

                  {/* V toggle button — only for unlocked cards */}
                  {!isLocked && hasMore && (
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : endpoint.id)}
                      title={isExpanded ? 'Sembunyikan' : 'Lihat kode penuh'}
                      className={cn(
                        'shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-200',
                        isExpanded
                          ? 'bg-indigo-500 border-indigo-500 text-white'
                          : 'bg-white/50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-indigo-500 hover:border-indigo-400'
                      )}
                    >
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="flex items-center justify-center"
                      >
                        <ChevronDown size={15} />
                      </motion.div>
                    </button>
                  )}
                </div>

                {/* ── Code block ── */}
                <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                  <div className={cn(
                    'relative bg-[#0d1117] rounded-xl overflow-hidden',
                    isLocked && 'cursor-not-allowed'
                  )}>
                    {/* Title bar */}
                    <div className="flex items-center justify-between px-3 sm:px-4 pt-2.5 pb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        <span className="ml-1.5 text-[9px] sm:text-[10px] text-neutral-500 font-mono uppercase tracking-wider select-none hidden xs:block">
                          {endpoint.type.toLowerCase()} / {endpoint.name.toLowerCase().replace(/\s+/g, '-')}
                        </span>
                      </div>

                      {/* Copy button — only visible when expanded */}
                      <AnimatePresence>
                        {isExpanded && !isLocked && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => handleCopy(endpoint.codeSnippet, endpoint.id)}
                            className={cn(
                              'flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                              copiedId === endpoint.id
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/50'
                            )}
                          >
                            {copiedId === endpoint.id
                              ? <><Check size={11} /> Copied!</>
                              : <><Copy size={11} /> Copy</>}
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Code area with smooth height animation */}
                    <div className="relative px-3 sm:px-4 pb-3 sm:pb-4">
                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? 'auto' : '80px',
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        style={{ overflow: 'hidden' }}
                      >
                        <pre className={cn(
                          'text-[11px] sm:text-[13px] font-mono text-neutral-200 leading-relaxed whitespace-pre-wrap break-words',
                          isLocked && 'blur-[4px] select-none opacity-60'
                        )}>
                          <code>{isLocked ? (endpoint.codeSnippet || '// kode tersembunyi') : displayCode}</code>
                        </pre>
                      </motion.div>

                      {/* Fade gradient — only when collapsed and has more */}
                      <AnimatePresence>
                        {!isLocked && !isExpanded && hasMore && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none"
                          />
                        )}
                      </AnimatePresence>

                      {/* Locked overlay */}
                      {isLocked && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#0d1117]/98 via-[#0d1117]/70 to-transparent px-4">
                          <div className="text-center">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-2 sm:mb-2.5 shadow-lg shadow-amber-500/40">
                              <Lock size={15} className="text-white sm:hidden" />
                              <Lock size={17} className="text-white hidden sm:block" />
                            </div>
                            <p className="text-white font-bold text-xs sm:text-sm mb-1">Konten Eksklusif Premium</p>
                            <p className="text-neutral-400 text-[11px] sm:text-xs mb-2.5 sm:mb-3">Akses seluruh kode dengan Premium</p>
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-[11px] sm:text-xs shadow-lg hover:scale-105 transition-transform active:scale-95"
                            >
                              <MessageCircle size={11} />
                              Upgrade Sekarang
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {filteredEndpoints.length === 0 && (
            <div className="text-center py-14 sm:py-16 text-neutral-500 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <Package size={32} className="mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-sm">Tidak ada kode ditemukan</p>
              <p className="text-xs mt-1 opacity-70">Coba kata kunci lain</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
