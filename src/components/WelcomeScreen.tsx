import React, { useState } from 'react';
import { motion } from 'motion/react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { seedDatabase } from '../seed';
import { toast } from 'sonner';

interface WelcomeScreenProps {
  onInitialize: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onInitialize }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        // Create new user profile
        await setDoc(doc(db, 'users', user.uid), {
          id: user.uid,
          username: user.displayName || 'New User',
          email: user.email,
          professional_bio: 'New to OpenSphere',
          is_verified: false,
          exposure_dial: 50,
          nodes: 0,
          trust_score: 50,
          following: [],
          credentials: [],
          documents: []
        });
      }
      
      await seedDatabase(); // Ensure mock data exists after auth
      toast.success('Authentication successful');
      onInitialize();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        toast.info('Login cancelled');
      } else {
        toast.error(error.message || 'Failed to authenticate');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center relative overflow-hidden font-body text-white">
      {/* Top Nav */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-0 w-full p-6 flex justify-between items-center"
      >
        <div className="flex items-center gap-2 text-[#00FFAB] font-bold text-xl tracking-tighter">
          <div className="w-6 h-6 relative">
            <div className="absolute inset-0 border-2 border-current rounded-full"></div>
            <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-current rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-1 left-0 w-1.5 h-1.5 bg-current rounded-full -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute bottom-1 right-0 w-1.5 h-1.5 bg-current rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
          OpenSphere
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col items-center z-10 w-full px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12 relative"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl border border-[#00FFAB]/20 bg-[#00FFAB]/5 flex items-center justify-center shadow-[0_0_50px_rgba(0,255,171,0.1)]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-[#00FFAB] shadow-[0_0_20px_rgba(0,255,171,0.5)]"></div>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-8xl font-black tracking-[0.1em] sm:tracking-[0.2em] mb-6 text-center"
        >
          OPENSPHERE
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-[#849589] tracking-[0.15em] sm:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm uppercase mb-12 sm:mb-16 text-center"
        >
          The Next-Gen Professional Ecosystem
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
        >
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="flex-1 bg-white text-black px-6 py-4 font-bold tracking-[0.1em] uppercase text-xs sm:text-sm transition-all cursor-pointer rounded-sm hover:bg-gray-200 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {isLoading ? 'Connecting...' : 'Sign in with Google'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
