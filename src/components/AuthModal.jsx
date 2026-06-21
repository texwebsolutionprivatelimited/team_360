import React, { useState } from 'react';
import { X, Sparkles, LogIn, UserPlus, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { loginUser, registerUser, resetUserPassword } from '../admin/contentStore';

const getFriendlyErrorMessage = (err) => {
  const code = err?.code || '';
  const message = err?.message || '';

  if (code === 'auth/user-not-found' || message.includes('user-not-found')) {
    return 'This email is not registered. Please click "Sign Up" above to create an account.';
  }
  if (code === 'auth/wrong-password' || message.includes('wrong-password')) {
    return 'Incorrect password. Please verify and try again, or click "Forgot Password?" below to reset it.';
  }
  if (code === 'auth/invalid-credential' || message.includes('invalid-credential')) {
    return 'Incorrect email or password. If you don\'t have an account yet, click "Sign Up" above to register.';
  }
  if (code === 'auth/email-already-in-use' || message.includes('email-already-in-use') || message.includes('User already exists')) {
    return 'This email is already registered. Please click "Login" above to sign in.';
  }
  if (code === 'auth/invalid-email' || message.includes('invalid-email')) {
    return 'Please enter a valid email address.';
  }
  if (code === 'auth/weak-password' || message.includes('weak-password')) {
    return 'Password is too weak. It must be at least 6 characters.';
  }
  if (code === 'auth/too-many-requests' || message.includes('too-many-requests')) {
    return 'Too many failed login attempts. This account has been temporarily disabled. Please try again later.';
  }
  
  return message || 'An error occurred. Please try again.';
};

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error on edit
    setSuccessMessage('');
  };

  const validate = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return false;
    }
    if (!isLoginTab) {
      if (!formData.name) {
        setError('Please enter your name.');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters.');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isForgotPassword) {
      if (!formData.email) {
        setError('Please enter your email address.');
        return;
      }
      setLoading(true);
      setError('');
      setSuccessMessage('');
      try {
        await resetUserPassword(formData.email);
        setSuccessMessage('A password reset link has been sent to your email.');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      } catch (err) {
        console.error(err);
        setError(getFriendlyErrorMessage(err));
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!validate()) return;

    setLoading(true);
    setError('');

    try {
      if (isLoginTab) {
        // Login Flow
        const loggedInUser = await loginUser(formData.email, formData.password);
        if (onSuccess) onSuccess(loggedInUser);
      } else {
        // Register Flow
        const registeredUser = await registerUser(formData.name, formData.email, formData.password);
        if (onSuccess) onSuccess(registeredUser);
      }
      
      // Reset form and close
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      onClose();
    } catch (err) {
      console.error(err);
      setError(getFriendlyErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start sm:items-center justify-center p-4 py-8">
      {/* Blurred Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0D0302]/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-[#2A0D04] via-[#1A0802] to-[#120502] rounded-2xl sm:rounded-3xl p-5 sm:p-8 overflow-hidden shadow-2xl border border-[#FFD95A]/25 text-[#FCE7C2] my-auto">
        
        {/* Glowing Background Auroras */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-amber-600/10 blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white/60 hover:text-[#FFD95A] transition-colors duration-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-full border border-[#FFD95A]/30 bg-[#FFD95A]/10 flex items-center justify-center mb-3">
            <Sparkles className="w-6 h-6 text-[#FFD95A] animate-pulse" />
          </div>
          <h3 className="font-serif text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFD95A] to-white">
            {isForgotPassword 
              ? 'Reset Password' 
              : (isLoginTab ? 'Welcome Back' : 'Create Account')}
          </h3>
          <p className="text-white/60 text-xs mt-1 text-center font-medium leading-relaxed">
            {isForgotPassword 
              ? 'Enter your email to receive a password reset link'
              : (isLoginTab 
                  ? 'Access your course vault and brain-training programs' 
                  : 'Join Team 360 and unlock your subconscious potential')}
          </p>
        </div>

        {/* Tabs (Hidden during Forgot Password flow) */}
        {!isForgotPassword && (
          <div className="flex bg-[#120502] p-1 rounded-xl mb-6 border border-white/5">
            <button
              onClick={() => { setIsLoginTab(true); setError(''); setSuccessMessage(''); }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isLoginTab 
                  ? 'bg-[#FFD95A] text-[#2A0D04] shadow-md' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLoginTab(false); setError(''); setSuccessMessage(''); }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                !isLoginTab 
                  ? 'bg-[#FFD95A] text-[#2A0D04] shadow-md' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-2.5 text-red-200 text-xs leading-normal">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-2.5 text-emerald-200 text-xs leading-normal">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {/* Name Field (Only on signup) */}
          {!isForgotPassword && !isLoginTab && (
            <div>
              <label className="block text-[10px] font-black text-[#FFD95A] uppercase tracking-widest mb-1.5">Full Name</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full bg-[#120502]/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFD95A]/60 focus:ring-1 focus:ring-[#FFD95A]/30 transition-all text-xs font-semibold"
              />
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-[10px] font-black text-[#FFD95A] uppercase tracking-widest mb-1.5">Email Address</label>
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@example.com"
              className="w-full bg-[#120502]/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFD95A]/60 focus:ring-1 focus:ring-[#FFD95A]/30 transition-all text-xs font-semibold"
            />
          </div>

          {/* Password Field (Hidden in Forgot Password mode) */}
          {!isForgotPassword && (
            <div>
              <label className="block text-[10px] font-black text-[#FFD95A] uppercase tracking-widest mb-1.5">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full bg-[#120502]/60 border border-white/10 rounded-xl px-4 py-3 pr-10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFD95A]/60 focus:ring-1 focus:ring-[#FFD95A]/30 transition-all text-xs font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-white/40 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Forgot Password Link */}
              {isLoginTab && (
                <button
                  type="button"
                  onClick={() => { setIsForgotPassword(true); setError(''); setSuccessMessage(''); }}
                  className="text-[10px] text-[#FFD95A]/70 hover:text-[#FFD95A] block mt-2 hover:underline text-right w-full font-bold cursor-pointer"
                >
                  Forgot Password?
                </button>
              )}
            </div>
          )}

          {/* Confirm Password Field (Only on signup) */}
          {!isForgotPassword && !isLoginTab && (
            <div>
              <label className="block text-[10px] font-black text-[#FFD95A] uppercase tracking-widest mb-1.5">Confirm Password</label>
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full bg-[#120502]/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFD95A]/60 focus:ring-1 focus:ring-[#FFD95A]/30 transition-all text-xs font-semibold"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#FFD95A] hover:bg-amber-400 text-[#2A0D04] font-black rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/10 hover:shadow-amber-500/25 mt-6 text-xs uppercase tracking-wider cursor-pointer"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-[#2A0D04] border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                {isForgotPassword 
                  ? <LogIn className="w-4 h-4" /> 
                  : (isLoginTab ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />)}
                {isForgotPassword 
                  ? 'Send Reset Email' 
                  : (isLoginTab ? 'Login Account' : 'Sign Up Account')}
              </>
            )}
          </button>
          
          {/* Back to Login link */}
          {isForgotPassword && (
            <button
              type="button"
              onClick={() => { setIsForgotPassword(false); setError(''); setSuccessMessage(''); }}
              className="text-xs text-[#FFD95A]/70 hover:text-[#FFD95A] mt-4 block text-center mx-auto hover:underline font-bold cursor-pointer"
            >
              Back to Login
            </button>
          )}
        </form>


      </div>
    </div>
  );
}
