import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { authService, isSupabaseConfigured } from '../services/auth';
import { Language, UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (user: UserProfile) => void;
  onSuccess?: (user: UserProfile) => void;
  language: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  onSuccess,
  language,
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (mode === 'signup') {
        const user = await authService.signUp(name, email, password);
        onAuthSuccess?.(user);
        onSuccess?.(user);
        onClose();
      } else if (mode === 'login') {
        const user = await authService.login(email, password);
        onAuthSuccess?.(user);
        onSuccess?.(user);
        onClose();
      } else if (mode === 'forgot') {
        const msg = await authService.resetPassword(email);
        setSuccessMsg(msg);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (persona: 'student' | 'farmer') => {
    const demoUser = authService.loginAsDemo(persona);
    onAuthSuccess?.(demoUser);
    onSuccess?.(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="bg-[#0b0e17] rounded-3xl shadow-2xl max-w-md w-full border border-white/[0.12] overflow-hidden flex flex-col text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-white/[0.03] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              य
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                {mode === 'login' 
                  ? (language === 'hi' ? 'लॉग इन करें' : 'Sign In')
                  : mode === 'signup'
                  ? (language === 'hi' ? 'नया खाता बनाएं' : 'Create Account')
                  : (language === 'hi' ? 'पासवर्ड भूल गए?' : 'Reset Password')}
              </h3>
              <p className="text-[11px] text-slate-400">
                {language === 'hi' ? 'व्यक्तिगत योजना सुझाव एवं दस्तावेज़ प्रबंधन' : 'Personal Scheme Portal & Document Vault'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 text-xs">
          {/* Mode Switcher Tabs */}
          {mode !== 'forgot' && (
            <div className="grid grid-cols-2 p-1 bg-white/[0.03] rounded-xl border border-white/[0.08]">
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMsg(null); }}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  mode === 'login'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {language === 'hi' ? 'लॉग इन (Login)' : 'Sign In'}
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setErrorMsg(null); }}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {language === 'hi' ? 'साइन अप (Sign Up)' : 'Sign Up'}
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  {language === 'hi' ? 'आपका पूरा नाम:' : 'Full Name:'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-9 pr-3 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                {language === 'hi' ? 'ईमेल पता:' : 'Email Address:'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-xs"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-300">
                    {language === 'hi' ? 'पासवर्ड:' : 'Password:'}
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[10px] text-blue-400 hover:underline"
                    >
                      {language === 'hi' ? 'पासवर्ड भूल गए?' : 'Forgot password?'}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center gap-1.5 transition-all"
            >
              <span>
                {loading 
                  ? (language === 'hi' ? 'प्रक्रिया जारी है...' : 'Processing...') 
                  : mode === 'signup' 
                  ? (language === 'hi' ? 'खाता बनाएं' : 'Create Account') 
                  : mode === 'login'
                  ? (language === 'hi' ? 'साइन इन करें' : 'Sign In')
                  : (language === 'hi' ? 'रीसेट लिंक भेजें' : 'Send Reset Link')}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {mode === 'forgot' && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs text-blue-400 hover:underline"
              >
                {language === 'hi' ? 'वापस लॉगिन पर जाएं' : 'Back to Sign In'}
              </button>
            </div>
          )}

          {/* 1-Click Instant Demo Profiles for Hackathon Testing */}
          <div className="pt-4 border-t border-white/[0.08] space-y-2">
            <span className="text-[11px] font-bold text-slate-400 block text-center uppercase tracking-wider">
              {language === 'hi' ? 'त्वरित डेमो परीक्षण (1-क्लिक लॉगिन):' : 'Instant Demo Personas (1-Click Test):'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('student')}
                className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-left transition-all group"
              >
                <div className="font-bold text-white text-[11px] flex items-center gap-1">
                  <span>🎓 Rahul (Student)</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">Uttarakhand • Class 10/12</p>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('farmer')}
                className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-left transition-all group"
              >
                <div className="font-bold text-white text-[11px] flex items-center gap-1">
                  <span>🌾 Sunita (Farmer)</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">UP • Landholder • DBT</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
