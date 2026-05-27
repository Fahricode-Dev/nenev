import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border-t-2 border-indigo-500/40 blur-[2px]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 5.5, ease: "linear" }}
          className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border-b-2 border-purple-500/40 blur-[1px]"
        />
        {/* Gem logo */}
        <motion.div
          animate={{ scale: [0.92, 1.06, 0.92] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 drop-shadow-2xl"
        >
          <svg width="60" height="60" viewBox="0 0 40 40" fill="none">
            <defs>
              <linearGradient id="bgGradL" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#6366f1"/>
                <stop offset="50%" stopColor="#8b5cf6"/>
                <stop offset="100%" stopColor="#a855f7"/>
              </linearGradient>
              <linearGradient id="shineL" x1="0" y1="0" x2="0" y2="20" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.30"/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M14 3 L26 3 L37 14 L37 26 L26 37 L14 37 L3 26 L3 14 Z" fill="url(#bgGradL)"/>
            <path d="M14 3 L26 3 L37 14 L20 14 L3 14 Z" fill="url(#shineL)"/>
            <path d="M14 3 L20 14 L3 14" stroke="white" strokeOpacity="0.15" strokeWidth="0.5"/>
            <path d="M26 3 L20 14 L37 14" stroke="white" strokeOpacity="0.15" strokeWidth="0.5"/>
            <path d="M12 28V12h2.8l9.4 11.2V12H27v16h-2.8L14.8 16.8V28H12z" fill="white"/>
            <circle cx="33" cy="7" r="1.8" fill="white" fillOpacity="0.5"/>
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-7 flex flex-col items-center gap-2.5"
      >
        <h1 className="text-base sm:text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
          Gudang Nevano
        </h1>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.12, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-indigo-500"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
