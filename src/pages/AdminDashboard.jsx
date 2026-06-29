import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  useAdminContent, useCurrentUser, loginUser, logoutUser,
  saveItem, deleteItem, adminAddEnrollment, adminRemoveEnrollment,
  emptyItemFor
} from '../admin/contentStore';
import { isFirebaseEnabled } from '../admin/firebaseConfig';
import { 
  Settings, Film, Users, Newspaper, MessageSquare, 
  Plus, Edit2, Trash2, CheckCircle, XCircle, X, 
  Key, Save, RefreshCw, Upload, Search, LogOut, Sparkles, User, AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useCurrentUser();
  
  // Tab control
  const [activeTab, setActiveTab] = useState('courses'); // 'courses', 'enrollments', 'blogs', 'inquiries'
  
  // Gate check
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dynamic state loaded from contentStore hooks
  const courses = useAdminContent('courses');
  const blogs = useAdminContent('blogs');
  const contacts = useAdminContent('contacts');
  const enrollments = useAdminContent('purchases');
  const users = useAdminContent('users');

  // Local state managers
  const [editingItem, setEditingItem] = useState(null); // Course, Blog, or Query being edited
  const [activeCourseId, setActiveCourseId] = useState(null); // Selected course for editing modules
  const [newModuleName, setNewModuleName] = useState('');
  
  // Settings Form State
  const [settings, setSettings] = useState({
    firebase: {
      apiKey: 'AIzaSyCEp45xgfqFqD55c6shvxO7_jxymXjHDts',
      authDomain: 'ddsharma-3befe.firebaseapp.com',
      projectId: 'ddsharma-3befe',
      storageBucket: 'ddsharma-3befe.firebasestorage.app',
      messagingSenderId: '452928596721',
      appId: '1:452928596721:web:5f5423d5f540a3b7825750'
    },
    razorpayKey: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
    imagekit: {
      urlEndpoint: 'https://ik.imagekit.io/zk1gmjhtt',
      publicKey: 'public_Y4lsHCnlEUNxsHMlG4dsLllVkAI=',
      authEndpoint: '/api/imagekit-auth'
    }
  });

  // Manual Enrollment form
  const [enrollEmail, setEnrollEmail] = useState('');
  const [enrollCourseId, setEnrollCourseId] = useState('');

  // Search filters
  const [searchQuery, setSearchQuery] = useState('');

  // Custom modal state for adding a video session
  const [activeModuleIdForNewSession, setActiveModuleIdForNewSession] = useState(null);
  const [newSessionData, setNewSessionData] = useState({ title: '', desc: '', videoId: '' });

  // Load Settings from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('t360_v5_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings(prev => ({
          ...prev,
          firebase: parsed.firebase || prev.firebase,
          razorpayKey: parsed.razorpayKey || '',
          imagekit: parsed.imagekit || prev.imagekit
        }));
      }
    } catch(e) {
      console.error('Error loading settings', e);
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const user = await loginUser(email, password);
      if (user.role !== 'admin') {
        await logoutUser();
        setLoginError('Access denied: User is not an Administrator.');
      }
    } catch(err) {
      const code = err?.code || '';
      const msg = err?.message || '';
      if (code === 'auth/user-not-found' || msg.includes('user-not-found')) {
        setLoginError('This email is not registered as an Administrator.');
      } else if (code === 'auth/wrong-password' || msg.includes('wrong-password')) {
        setLoginError('Incorrect password. Please try again.');
      } else if (code === 'auth/invalid-credential' || msg.includes('invalid-credential')) {
        setLoginError('Incorrect email or password. Please try again.');
      } else if (code === 'auth/too-many-requests' || msg.includes('too-many-requests')) {
        setLoginError('Too many failed attempts. This account has been temporarily disabled. Please try again later.');
      } else {
        setLoginError(err.message || 'Invalid credentials');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('t360_v5_settings', JSON.stringify(settings));
    alert('Settings saved. Refreshing the application to apply configuration...');
    window.location.reload();
  };

  // Image Upload helper (ImageKit + local fallback)
  const handleImageUpload = async (e, onUrlCallback) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if ImageKit is configured
    if (settings.imagekit.publicKey && settings.imagekit.urlEndpoint) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);
        formData.append("publicKey", settings.imagekit.publicKey);

        // Fetch signature from authorization endpoint if configured
        if (settings.imagekit.authEndpoint) {
          const authRes = await fetch(settings.imagekit.authEndpoint);
          const authData = await authRes.json();
          formData.append("signature", authData.signature);
          formData.append("expire", authData.expire);
          formData.append("token", authData.token);
        }

        const res = await fetch(`https://upload.imagekit.io/api/v1/files/upload`, {
          method: "POST",
          body: formData
        });
        const data = await res.json();
        if (data.url) {
          onUrlCallback(data.url);
          alert('Image uploaded successfully to ImageKit!');
          return;
        }
      } catch(err) {
        console.error('ImageKit upload failed, falling back:', err);
      }
    }

    // Fallback: convert to Base64 (Local file reader)
    const reader = new FileReader();
    reader.onloadend = () => {
      onUrlCallback(reader.result);
      alert('Operating in Demo Mode: Image cached locally.');
    };
    reader.readAsDataURL(file);
  };

  // Manual Enrollment Submission
  const handleManualEnrollSubmit = async (e) => {
    e.preventDefault();
    if (!enrollEmail || !enrollCourseId) return;

    try {
      await adminAddEnrollment(enrollEmail, enrollCourseId);
      alert(`User ${enrollEmail} successfully enrolled!`);
      setEnrollEmail('');
    } catch(err) {
      alert('Enrollment failed: ' + err.message);
    }
  };

  // Course Management
  const handleSaveCourse = async (e) => {
    e.preventDefault();
    if (!editingItem.title || !editingItem.id) {
      alert('Course Title and Slug/ID are required.');
      return;
    }
    
    // Ensure modules array is preserved
    const courseToSave = {
      ...editingItem,
      modules: editingItem.modules || []
    };

    await saveItem('courses', courseToSave);
    setEditingItem(null);
    alert('Course saved successfully!');
  };

  // Module Management
  const handleAddModule = async () => {
    if (!newModuleName.trim()) return;
    const course = courses.find(c => c.id === activeCourseId);
    if (!course) return;

    const newModule = {
      id: `mod-${Date.now()}`,
      title: newModuleName.trim(),
      sessions: []
    };

    const updatedModules = [...(course.modules || []), newModule];
    await saveItem('courses', { ...course, modules: updatedModules });
    setNewModuleName('');
  };

  const handleDeleteModule = async (moduleId) => {
    if (!confirm('Are you sure you want to delete this module and all its sessions?')) return;
    const course = courses.find(c => c.id === activeCourseId);
    if (!course) return;

    const updatedModules = (course.modules || []).filter(m => m.id !== moduleId);
    await saveItem('courses', { ...course, modules: updatedModules });
  };

  // Session/Video Management inside modules
  const handleAddSession = (moduleId) => {
    setActiveModuleIdForNewSession(moduleId);
    setNewSessionData({ title: '', desc: '', videoId: '' });
  };

  const handleSaveNewSession = async (e) => {
    e.preventDefault();
    if (!newSessionData.title || !newSessionData.videoId) {
      alert("Session Title and YouTube Video ID are required.");
      return;
    }

    const course = courses.find(c => c.id === activeCourseId);
    if (!course) return;

    const updatedModules = (course.modules || []).map(m => {
      if (m.id === activeModuleIdForNewSession) {
        return {
          ...m,
          sessions: [...(m.sessions || []), { 
            id: newSessionData.videoId.trim(), 
            title: newSessionData.title.trim(), 
            desc: newSessionData.desc.trim() 
          }]
        };
      }
      return m;
    });

    await saveItem('courses', { ...course, modules: updatedModules });
    setActiveModuleIdForNewSession(null);
    setNewSessionData({ title: '', desc: '', videoId: '' });
  };

  const handleDeleteSession = async (moduleId, sessionId) => {
    if (!confirm('Delete this video session?')) return;
    const course = courses.find(c => c.id === activeCourseId);
    if (!course) return;

    const updatedModules = (course.modules || []).map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          sessions: (m.sessions || []).filter(s => s.id !== sessionId)
        };
      }
      return m;
    });

    await saveItem('courses', { ...course, modules: updatedModules });
  };

  // Blog Management
  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!editingItem.title) {
      alert('Blog Title is required.');
      return;
    }
    
    // Generate slug from title if not set
    const slug = editingItem.id || String(editingItem.title).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const blogToSave = {
      ...editingItem,
      id: slug
    };

    await saveItem('blogs', blogToSave);
    setEditingItem(null);
    alert('Blog post saved successfully!');
  };

  // Inquiry Tracker Management
  const handleResolveInquiry = async (inquiry) => {
    const updated = { ...inquiry, status: 'resolved' };
    await saveItem('contacts', updated);
  };

  if (authLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-[#FFF5EE] text-gray-900 flex flex-col items-center justify-center">
        <span className="w-10 h-10 border-4 border-[#2A0D04] border-t-transparent rounded-full animate-spin"></span>
        <p className="text-gray-500 text-xs mt-4 font-semibold uppercase tracking-wider">Verifying Admin Credentials...</p>
      </div>
    );
  }

  // Gate Check Login Screen (if not admin)
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-24 min-h-screen bg-[#FFF5EE] text-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
        
        {/* Glow Spheres */}
        <div className="absolute top-[10%] left-[-15%] w-[45%] h-[40%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-15%] w-[45%] h-[40%] rounded-full bg-amber-600/5 blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md bg-gradient-to-br from-[#2A0D04] via-[#1F0903] to-[#120502] rounded-2xl p-5 sm:p-8 overflow-hidden shadow-2xl border border-amber-500/25 text-[#FCE7C2] text-left space-y-6 relative z-10">
          
          <div className="flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center mb-2.5">
              <Key className="w-5.5 h-5.5 text-[#FFD95A]" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFD95A] to-white">
              Admin Login Gate
            </h3>
            <p className="text-white/60 text-[11px] mt-1 font-semibold leading-relaxed">
              Authorized access only. Enter administrative credentials.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-500/15 border border-red-500/30 rounded-xl flex items-start gap-2 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-[#FFD95A] uppercase tracking-widest mb-1.5">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@team360.com"
                className="w-full bg-[#120502]/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFD95A]/60 text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-[#FFD95A] uppercase tracking-widest mb-1.5">Secret Key / Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#120502]/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFD95A]/60 text-xs font-bold"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-[#FFD95A] hover:bg-amber-400 text-[#2A0D04] font-black rounded-xl flex items-center justify-center gap-2 transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              {loginLoading ? (
                <span className="w-5 h-5 border-2 border-[#2A0D04] border-t-transparent rounded-full animate-spin"></span>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Page (Authenticated Admin)
  return (
    <div className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-24 min-h-screen bg-[#FFF5EE] text-gray-900 relative overflow-hidden text-left font-sans">
      
      {/* Hide Scrollbar styling */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .admin-tab-container {
          white-space: nowrap !important;
        }
        .admin-tab-btn {
          white-space: nowrap !important;
          flex-shrink: 0 !important;
        }
      `}</style>

      {/* Decorative Orbs */}
      <div className="absolute top-[10%] left-[-15%] w-[45%] h-[40%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[45%] h-[40%] rounded-full bg-amber-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-[95%] mx-auto px-2 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-10">
        
        {/* Header */}
        <div className="border-b border-amber-100 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-[#6B2D17] tracking-widest bg-[#6B2D17]/5 border border-[#6B2D17]/10 px-3 py-1 rounded-full">
              🔱 Admin Portal
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#2A0D04] mt-2">
              Management Dashboard
            </h1>
            <p className="text-gray-500 text-xs font-semibold mt-1 flex flex-wrap items-center gap-2">
              <span>Connected as Administrator</span>
              <span className={`w-2 h-2 rounded-full ${isFirebaseEnabled ? 'bg-emerald-500' : 'bg-orange-500'} animate-pulse`} />
              <span className="text-[10px] uppercase font-black tracking-wider text-gray-400">
                ({isFirebaseEnabled ? 'Firebase Firestore Live' : 'Demo LocalStorage Mode'})
              </span>
            </p>
          </div>

          <button
            onClick={() => logoutUser()}
            className="w-fit self-start md:self-end flex items-center gap-1.5 border border-red-200 hover:border-red-500 text-red-600 hover:bg-red-500/5 font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            <LogOut className="w-4 h-4" />
            Logout Admin
          </button>
        </div>

        {/* Tab Selection (Horizontally scrollable on mobile) */}
        <div className="flex overflow-x-auto no-scrollbar bg-white border border-amber-100 p-1.5 rounded-2xl gap-1.5 text-xs admin-tab-container">
          {[
            { id: 'courses', label: 'Recorded Course Modules', icon: <Film className="w-4 h-4" /> },
            { id: 'enrollments', label: 'Enrollment Manager', icon: <Users className="w-4 h-4" /> },
            { id: 'blogs', label: 'Blog Publisher', icon: <Newspaper className="w-4 h-4" /> },
            { id: 'inquiries', label: 'Inquiry Tracker', icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'settings', label: 'System Settings', icon: <Settings className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setEditingItem(null); setActiveCourseId(null); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer admin-tab-btn ${
                activeTab === tab.id 
                  ? 'bg-[#2A0D04] text-[#FFD95A]' 
                  : 'text-gray-500 hover:bg-amber-50/40 hover:text-[#2A0D04]'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Panels */}
        <div className="bg-white border border-amber-100/60 rounded-3xl p-4 sm:p-8 shadow-xl">
          


          {/* ==================== 2. COURSE MODULES TAB ==================== */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              {!activeCourseId && !editingItem ? (
                /* Main Courses List Page */
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-50 pb-3">
                    <h3 className="font-serif text-lg font-bold text-[#2A0D04]">Course Catalog</h3>
                    <button
                      onClick={() => setEditingItem(emptyItemFor('courses'))}
                      className="bg-[#2A0D04] text-[#FFD95A] text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add Course
                    </button>
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto rounded-2xl border border-amber-100">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-amber-50/40 text-gray-500 uppercase text-[9px] font-black tracking-widest border-b border-amber-100">
                        <tr>
                          <th className="p-4">Title</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Type</th>
                          <th className="p-4">Price</th>
                          <th className="p-4">Modules Count</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-50/50 font-semibold text-gray-700">
                        {courses.map((c) => (
                          <tr key={c.id} className="hover:bg-amber-50/10">
                            <td className="p-4 font-bold text-[#2A0D04] max-w-[200px] truncate">{c.title}</td>
                            <td className="p-4">{c.category}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${c.isRecorded || c.type === 'Recorded Session' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'}`}>
                                {c.isRecorded || c.type === 'Recorded Session' ? 'Recorded Vault' : 'Live Program'}
                              </span>
                            </td>
                            <td className="p-4">₹{(c.price || 0).toLocaleString()}</td>
                            <td className="p-4">{c.modules ? c.modules.length : 0} modules</td>
                            <td className="p-4 text-right flex items-center justify-end gap-2">
                              {(c.isRecorded || c.type === 'Recorded Session') && (
                                <button
                                  onClick={() => setActiveCourseId(c.id)}
                                  className="text-purple-600 hover:text-purple-900 border border-purple-200 px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-all font-black uppercase text-[10px] tracking-wider cursor-pointer"
                                >
                                  Edit Syllabus
                                </button>
                              )}
                              <button
                                onClick={() => setEditingItem(c)}
                                className="p-1.5 text-amber-600 hover:text-amber-900 hover:bg-amber-50 rounded-lg cursor-pointer"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete course ${c.title}?`)) {
                                    deleteItem('courses', c.id);
                                  }
                                }}
                                className="p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards View */}
                  <div className="grid grid-cols-1 md:hidden gap-4 text-left">
                    {courses.map((c) => (
                      <div key={c.id} className="bg-amber-50/10 border border-amber-100 p-4 rounded-2xl space-y-3 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm text-[#2A0D04] truncate max-w-[170px]">{c.title}</h4>
                            <p className="text-[10px] text-gray-500 mt-0.5">{c.category}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0 ${c.isRecorded || c.type === 'Recorded Session' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'}`}>
                            {c.isRecorded || c.type === 'Recorded Session' ? 'Recorded' : 'Live'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-amber-100/50 text-xs">
                          <span className="font-black text-[#2A0D04]">₹{(c.price || 0).toLocaleString()}</span>
                          <div className="flex items-center gap-1.5">
                            {(c.isRecorded || c.type === 'Recorded Session') && (
                              <button
                                onClick={() => setActiveCourseId(c.id)}
                                className="bg-purple-50 hover:bg-purple-100 text-purple-600 border border-purple-200 text-[10px] font-bold px-2 py-1 rounded-lg cursor-pointer"
                              >
                                Syllabus
                              </button>
                            )}
                            <button onClick={() => setEditingItem(c)} className="p-1 text-amber-600 cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => { if (confirm(`Delete course ${c.title}?`)) deleteItem('courses', c.id); }} className="p-1 text-red-600 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ) : activeCourseId ? (
                /* Dynamic Module Editor for Selected Course */
                <div className="space-y-6">
                  {(() => {
                    const course = courses.find(c => c.id === activeCourseId);
                    if (!course) return null;
                    return (
                      <>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-amber-50 pb-3 gap-2">
                          <div>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Editing Course Syllabus</span>
                            <h3 className="font-serif text-lg font-bold text-[#2A0D04] mt-0.5">{course.title}</h3>
                          </div>
                          <button
                            onClick={() => setActiveCourseId(null)}
                            className="border border-amber-200 text-[#2A0D04] font-bold text-xs uppercase px-4 py-2 rounded-xl transition-all cursor-pointer hover:bg-amber-50 align-self-start"
                          >
                            Back to Courses
                          </button>
                        </div>

                        {/* Modules Accordion List */}
                        <div className="space-y-4">
                          {course.modules && course.modules.map((m, mIdx) => (
                            <div key={m.id || mIdx} className="bg-amber-50/20 border border-amber-100 rounded-2xl p-4 sm:p-5 space-y-4 text-left">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-amber-100 pb-2 gap-2">
                                <h4 className="font-bold text-sm text-[#2A0D04] flex items-center gap-1.5">
                                  <Film className="w-4.5 h-4.5 text-purple-600" />
                                  {m.title}
                                </h4>
                                <div className="flex gap-2 justify-end">
                                  <button
                                    onClick={() => handleAddSession(m.id)}
                                    className="bg-white hover:bg-purple-50 text-purple-600 border border-purple-200 text-[10px] font-black uppercase px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                                  >
                                    + Add Video
                                  </button>
                                  <button
                                    onClick={() => handleDeleteModule(m.id)}
                                    className="p-1 text-red-500 hover:text-red-800 hover:bg-red-50 rounded-lg cursor-pointer"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Sessions list */}
                              <div className="space-y-2">
                                {m.sessions && m.sessions.length > 0 ? (
                                  m.sessions.map((s, sIdx) => (
                                    <div key={s.id || sIdx} className="bg-white border border-amber-100/50 p-3 rounded-xl flex items-start justify-between gap-3 text-xs">
                                      <div className="flex items-start gap-2.5 min-w-0">
                                        <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center text-[#2A0D04] shrink-0 mt-0.5 font-bold">
                                          {sIdx + 1}
                                        </div>
                                        <div className="min-w-0">
                                          <h5 className="font-bold text-gray-900 leading-snug">{s.title}</h5>
                                          <p className="text-gray-500 text-[10px] mt-0.5 line-clamp-1 font-semibold">{s.desc}</p>
                                          <span className="inline-block mt-1 text-[9px] bg-purple-50 text-purple-600 font-bold px-2 py-0.5 rounded-md">
                                            YouTube: {s.id}
                                          </span>
                                        </div>
                                      </div>
                                      <button
                                        onClick={() => handleDeleteSession(m.id, s.id)}
                                        className="text-red-500 hover:text-red-800 p-1 hover:bg-red-50 rounded-lg cursor-pointer shrink-0"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-[10px] text-gray-400 italic">No video lessons published inside this module.</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add Module Box */}
                        <div className="bg-white border border-amber-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-3 items-end max-w-lg text-left">
                          <div className="flex-1 w-full">
                            <label className="block text-[9px] font-black text-[#6B2D17] uppercase tracking-widest mb-1.5">New Module Name</label>
                            <input
                              type="text"
                              value={newModuleName}
                              onChange={(e) => setNewModuleName(e.target.value)}
                              placeholder="e.g. Module 4: Manifestation Mastery"
                              className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                            />
                          </div>
                          <button
                            onClick={handleAddModule}
                            className="bg-[#2A0D04] text-[#FFD95A] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer w-full sm:w-auto mt-2 sm:mt-0"
                          >
                            Create Module
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                /* Course Meta Add/Edit Form */
                <form onSubmit={handleSaveCourse} className="space-y-5 text-left">
                  <div className="flex items-center justify-between border-b border-amber-50 pb-2">
                    <h4 className="font-serif font-bold text-base sm:text-lg text-[#2A0D04]">
                      {editingItem.id ? `Edit Course details` : 'Add New Course'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="text-xs text-gray-500 border border-amber-100 px-3 py-1.5 rounded-xl hover:bg-amber-50"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Course Title</label>
                      <input
                        type="text"
                        required
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        placeholder="Course Title"
                        className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Slug / Unique ID (lowercase, hyphenated)</label>
                      <input
                        type="text"
                        required
                        disabled={!!editingItem.id}
                        value={editingItem.id}
                        onChange={(e) => setEditingItem({ ...editingItem, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                        placeholder="quantum-jump-v2"
                        className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Category</label>
                      <input
                        type="text"
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        placeholder="Mind & Abundance"
                        className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Course Type</label>
                      <select
                        value={editingItem.type}
                        onChange={(e) => setEditingItem({ 
                          ...editingItem, 
                          type: e.target.value,
                          isRecorded: e.target.value === 'Recorded Session'
                        })}
                        className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                      >
                        <option value="Workshop">Workshop (Live)</option>
                        <option value="Recorded Session">Recorded Session (Paid Access)</option>
                        <option value="Trainer Program">Trainer Program</option>
                        <option value="Mentorship Program">Mentorship Program</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Investment Price (INR)</label>
                      <input
                        type="number"
                        value={editingItem.price === undefined || editingItem.price === null ? '' : editingItem.price}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingItem({ 
                            ...editingItem, 
                            price: val === '' ? '' : Number(val) 
                          });
                        }}
                        placeholder="35400"
                        className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Course Image URL</label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={editingItem.image}
                          onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                          placeholder="/quantum_jump_gayatri.png"
                          className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                        />
                        <div className="relative shrink-0">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (url) => setEditingItem({ ...editingItem, image: url }))}
                            className="hidden" 
                            id="course-image-upload" 
                          />
                          <label 
                            htmlFor="course-image-upload"
                            className="w-full sm:w-auto bg-amber-100 hover:bg-amber-200 text-[#2A0D04] font-bold text-xs uppercase px-4 py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                          >
                            <Upload className="w-4 h-4" /> Upload File
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Duration &amp; Subtitle</label>
                      <input
                        type="text"
                        value={editingItem.duration}
                        onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                        placeholder="e.g. 5 Days Recorded Course"
                        className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Short Description</label>
                    <textarea
                      rows="2"
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      placeholder="Write brief description..."
                      className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Detailed Syllabus (Newlines represent bullet points)</label>
                    <textarea
                      rows="4"
                      value={editingItem.details}
                      onChange={(e) => setEditingItem({ ...editingItem, details: e.target.value })}
                      placeholder="Write syllabus program..."
                      className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#2A0D04] hover:bg-[#6B2D17] text-[#FFD95A] font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" /> Save Course Details
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ==================== 3. ENROLLMENTS TAB ==================== */}
          {activeTab === 'enrollments' && (
            <div className="space-y-6 text-left">
              {/* Enrollment Header and Quick Form */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-amber-50 pb-6">
                
                {/* Manual enrollment form (5 cols) */}
                <div className="lg:col-span-5 bg-amber-50/20 border border-amber-100 p-4 sm:p-5 rounded-2xl space-y-4 w-full">
                  <h3 className="font-serif text-sm font-black text-[#2A0D04] uppercase tracking-wider flex items-center gap-1 border-b border-amber-100 pb-1.5">
                    <Plus className="w-4 h-4" /> Enroll User Manually
                  </h3>
                  
                  <form onSubmit={handleManualEnrollSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">User Email Address</label>
                      <input
                        type="email"
                        required
                        value={enrollEmail}
                        onChange={(e) => setEnrollEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="w-full bg-white border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Recorded Course</label>
                      <select
                        value={enrollCourseId}
                        onChange={(e) => setEnrollCourseId(e.target.value)}
                        className="w-full bg-white border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none cursor-pointer"
                      >
                        <option value="">-- Select Course --</option>
                        {courses.filter(c => c.isRecorded || c.type === 'Recorded Session').map(c => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#2A0D04] text-[#FFD95A] font-bold text-xs uppercase tracking-wider py-3 rounded-xl cursor-pointer"
                    >
                      Authorize Access
                    </button>
                  </form>
                </div>

                {/* Enrollment list description (7 cols) */}
                <div className="lg:col-span-7 space-y-3 pt-2 w-full">
                  <h3 className="font-serif text-base font-bold text-[#2A0D04]">Enrollment Manager Details</h3>
                  <p className="text-gray-500 text-xs font-semibold leading-relaxed">
                    Here you can see the complete records of users who bought courses online via Razorpay or was manually enrolled. Search by student name, email, or course to quickly manage access permissions.
                  </p>

                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search students by email or name..."
                      className="w-full bg-amber-50/20 border border-amber-100 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#2A0D04]"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  </div>
                </div>

              </div>

              {/* Enrollments Table */}
              <div className="space-y-3">
                <h4 className="font-serif text-sm font-bold text-[#2A0D04]">Enrolled Transactions</h4>
                
                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto rounded-2xl border border-amber-100">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-amber-50/40 text-gray-500 uppercase text-[9px] font-black tracking-widest border-b border-amber-100">
                      <tr>
                        <th className="p-4">Student</th>
                        <th className="p-4">Course</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Payment ID</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4 text-right">Revoke Access</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-50/50 font-semibold text-gray-700">
                      {enrollments
                        .filter(e => 
                          (e.userName && e.userName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (e.userEmail && e.userEmail.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (e.courseId && e.courseId.toLowerCase().includes(searchQuery.toLowerCase()))
                        )
                        .map((enroll) => {
                          const courseObj = courses.find(c => c.id === enroll.courseId);
                          return (
                            <tr key={enroll.id} className="hover:bg-amber-50/10">
                              <td className="p-4">
                                <span className="block font-bold text-[#2A0D04]">{enroll.userName || 'Guest User'}</span>
                                <span className="block text-[10px] text-gray-400 mt-0.5">{enroll.userEmail}</span>
                              </td>
                              <td className="p-4 font-bold text-gray-600 max-w-[150px] truncate">
                                {courseObj ? courseObj.title : enroll.courseId}
                              </td>
                              <td className="p-4 text-gray-500">{enroll.date}</td>
                              <td className="p-4 font-mono text-[10px] text-gray-500">{enroll.paymentId}</td>
                              <td className="p-4">₹{(enroll.amount || 0).toLocaleString()}</td>
                              <td className="p-4 text-right">
                                <button
                                  onClick={() => {
                                    if (confirm(`Revoke course access for ${enroll.userEmail}?`)) {
                                      adminRemoveEnrollment(enroll.id);
                                    }
                                  }}
                                  className="p-1.5 text-red-500 hover:text-red-900 hover:bg-red-50 rounded-lg cursor-pointer"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      {enrollments.length === 0 && (
                        <tr>
                          <td colSpan="6" className="p-8 text-center text-gray-400 italic">No course purchases or enrollments registered yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards View */}
                <div className="grid grid-cols-1 md:hidden gap-4">
                  {enrollments
                    .filter(e => 
                      (e.userName && e.userName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                      (e.userEmail && e.userEmail.toLowerCase().includes(searchQuery.toLowerCase())) ||
                      (e.courseId && e.courseId.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                    .map((enroll) => {
                      const courseObj = courses.find(c => c.id === enroll.courseId);
                      return (
                        <div key={enroll.id} className="bg-amber-50/10 border border-amber-100 p-4 rounded-2xl space-y-2.5 shadow-sm text-xs">
                          <div className="flex justify-between items-start">
                            <div className="min-w-0">
                              <h5 className="font-bold text-[#2A0D04] truncate max-w-[170px]">{enroll.userName || 'Guest User'}</h5>
                              <p className="text-[10px] text-gray-400 mt-0.5 truncate max-w-[170px]">{enroll.userEmail}</p>
                            </div>
                            <span className="font-black text-gray-800 shrink-0">₹{(enroll.amount || 0).toLocaleString()}</span>
                          </div>
                          <div className="text-[11px] space-y-1 pt-1.5 border-t border-amber-100/50 text-gray-600">
                            <div>Course: <span className="font-bold text-[#2A0D04] truncate block max-w-full">{courseObj ? courseObj.title : enroll.courseId}</span></div>
                            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                              <span>Date: {enroll.date}</span>
                            </div>
                            <div className="font-mono text-[9px] text-gray-400 truncate max-w-full">ID: {enroll.paymentId}</div>
                          </div>
                          <div className="flex justify-end pt-1.5 border-t border-amber-100/50">
                            <button
                              onClick={() => {
                                if (confirm(`Revoke course access for ${enroll.userEmail}?`)) {
                                  adminRemoveEnrollment(enroll.id);
                                }
                              }}
                              className="text-red-500 hover:text-red-800 flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Revoke Access
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  {enrollments.length === 0 && (
                    <p className="text-center py-6 text-gray-400 italic">No course purchases or enrollments registered.</p>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* ==================== 4. BLOGS TAB ==================== */}
          {activeTab === 'blogs' && (
            <div className="space-y-6">
              {!editingItem ? (
                /* Blogs Listing Page */
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-50 pb-3">
                    <h3 className="font-serif text-lg font-bold text-[#2A0D04]">Published Blogs</h3>
                    <button
                      onClick={() => setEditingItem(emptyItemFor('blogs'))}
                      className="bg-[#2A0D04] text-[#FFD95A] text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Create Blog Post
                    </button>
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto rounded-2xl border border-amber-100">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-amber-50/40 text-gray-500 uppercase text-[9px] font-black tracking-widest border-b border-amber-100">
                        <tr>
                          <th className="p-4">Title</th>
                          <th className="p-4">Author</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Category / Course Tag</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-50/50 font-semibold text-gray-700">
                        {blogs.map((b) => (
                          <tr key={b.id} className="hover:bg-amber-50/10">
                            <td className="p-4 font-bold text-[#2A0D04] max-w-[250px] truncate">{b.title}</td>
                            <td className="p-4">{b.author || 'Devendra Sharma'}</td>
                            <td className="p-4 text-gray-500">{b.date}</td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 bg-amber-50 border border-amber-100 rounded text-[10px] font-bold text-[#6B2D17]">
                                {b.course || 'General'}
                              </span>
                            </td>
                            <td className="p-4 text-right flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditingItem(b)}
                                className="p-1.5 text-amber-600 hover:text-amber-900 hover:bg-amber-50 rounded-lg cursor-pointer"
                              >
                                <Edit2 className="w-4.5 h-4.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete blog post ${b.title}?`)) {
                                    deleteItem('blogs', b.id);
                                  }
                                }}
                                className="p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg cursor-pointer"
                              >
                                <Trash2 className="w-4.5 h-4.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards View */}
                  <div className="grid grid-cols-1 md:hidden gap-4 text-left">
                    {blogs.map((b) => (
                      <div key={b.id} className="bg-amber-50/10 border border-amber-100 p-4 rounded-2xl space-y-2.5 shadow-sm">
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm text-[#2A0D04] truncate max-w-full">{b.title}</h4>
                          <div className="flex gap-2 text-[10px] text-gray-500 mt-1 font-semibold">
                            <span>By {b.author || 'Devendra Sharma'}</span>
                            <span>•</span>
                            <span>{b.date}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-amber-100/50 text-xs">
                          <span className="px-2 py-0.5 bg-amber-50 border border-amber-100 rounded text-[9px] font-bold text-[#6B2D17]">
                            {b.course || 'General'}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => setEditingItem(b)} className="p-1 text-amber-600 cursor-pointer"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => { if (confirm(`Delete blog post ${b.title}?`)) deleteItem('blogs', b.id); }} className="p-1 text-red-600 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ) : (
                /* Blog Add/Edit Form */
                <form onSubmit={handleSaveBlog} className="space-y-5 text-left">
                  <div className="flex items-center justify-between border-b border-amber-50 pb-2">
                    <h4 className="font-serif font-bold text-base sm:text-lg text-[#2A0D04]">
                      {editingItem.id ? 'Edit Blog Post' : 'Compose New Blog Post'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="text-xs text-gray-500 border border-amber-100 px-3 py-1.5 rounded-xl hover:bg-amber-50"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Blog Title</label>
                      <input
                        type="text"
                        required
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        placeholder="The Science of Subconscious Chanting"
                        className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Tagline</label>
                      <input
                        type="text"
                        value={editingItem.tagline}
                        onChange={(e) => setEditingItem({ ...editingItem, tagline: e.target.value })}
                        placeholder="How alpha sound waves rewire neural pathways..."
                        className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Author Name</label>
                      <input
                        type="text"
                        value={editingItem.author}
                        onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                        placeholder="Devendra Sharma"
                        className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Read Duration (e.g. 5 mins read)</label>
                      <input
                        type="text"
                        value={editingItem.readTime}
                        onChange={(e) => setEditingItem({ ...editingItem, readTime: e.target.value })}
                        placeholder="5 mins read"
                        className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Modality/Course Tag</label>
                      <input
                        type="text"
                        value={editingItem.course}
                        onChange={(e) => setEditingItem({ ...editingItem, course: e.target.value })}
                        placeholder="Gayatri Science"
                        className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Image URL</label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={editingItem.image}
                          onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                          placeholder="/gayatri_sun.png"
                          className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                        />
                        <div className="relative shrink-0">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (url) => setEditingItem({ ...editingItem, image: url }))}
                            className="hidden" 
                            id="blog-image-upload" 
                          />
                          <label 
                            htmlFor="blog-image-upload"
                            className="w-full sm:w-auto bg-amber-100 hover:bg-amber-200 text-[#2A0D04] font-bold text-xs uppercase px-4 py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                          >
                            <Upload className="w-4 h-4" /> Upload File
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Slug (leave blank to auto-generate)</label>
                      <input
                        type="text"
                        disabled={!!editingItem.id}
                        value={editingItem.id}
                        onChange={(e) => setEditingItem({ ...editingItem, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                        placeholder="scientific-power-gayatri-mantra"
                        className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Introduction Paragraph</label>
                    <textarea
                      rows="3"
                      value={editingItem.intro}
                      onChange={(e) => setEditingItem({ ...editingItem, intro: e.target.value })}
                      placeholder="Write intro..."
                      className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Inspirational Quote</label>
                    <input
                      type="text"
                      value={editingItem.quote}
                      onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                      placeholder="The Gayatri Mantra is a universal prayer that aligns our conscious mind..."
                      className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Conclusion</label>
                    <textarea
                      rows="2"
                      value={editingItem.conclusion}
                      onChange={(e) => setEditingItem({ ...editingItem, conclusion: e.target.value })}
                      placeholder="Write conclusion..."
                      className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#2A0D04] hover:bg-[#6B2D17] text-[#FFD95A] font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" /> Publish Blog Post
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ==================== 5. INQUIRIES TAB ==================== */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="border-b border-amber-50 pb-3 text-left">
                <h3 className="font-serif text-lg font-bold text-[#2A0D04]">Contact Form Enquiries</h3>
                <p className="text-gray-500 text-xs mt-1">Manage and resolve user consultation requests or questions.</p>
              </div>

              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto rounded-2xl border border-amber-100">
                <table className="w-full text-xs text-left">
                  <thead className="bg-amber-50/40 text-gray-500 uppercase text-[9px] font-black tracking-widest border-b border-amber-100">
                    <tr>
                      <th className="p-4">Date</th>
                      <th className="p-4">Contact Info</th>
                      <th className="p-4">Requested Program</th>
                      <th className="p-4">Message Details</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-50/50 font-semibold text-gray-700">
                    {contacts.map((c) => (
                      <tr key={c.id || c.date} className={`hover:bg-amber-50/10 ${c.status === 'resolved' ? 'opacity-60 bg-gray-50/5' : ''}`}>
                        <td className="p-4 text-gray-500 whitespace-nowrap">{c.date}</td>
                        <td className="p-4">
                          <span className="block font-bold text-[#2A0D04]">{c.name}</span>
                          <span className="block text-[10px] text-gray-400 mt-0.5">{c.email}</span>
                          <span className="block text-[10px] text-[#6B2D17] font-bold mt-0.5">{c.phone}</span>
                        </td>
                        <td className="p-4 font-bold text-gray-600 max-w-[150px] truncate">{c.program}</td>
                        <td className="p-4 text-gray-500 max-w-[220px] leading-relaxed break-words">{c.message}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                            c.status === 'resolved' 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-amber-100 text-amber-700 animate-pulse'
                          }`}>
                            {c.status === 'resolved' ? 'Resolved' : 'New Enq'}
                          </span>
                        </td>
                        <td className="p-4 text-right flex items-center justify-end gap-1.5">
                          {c.status !== 'resolved' && (
                            <button
                              onClick={() => handleResolveInquiry(c)}
                              className="p-1.5 text-emerald-600 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg cursor-pointer"
                              title="Mark as Resolved"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (confirm('Delete inquiry permanently?')) {
                                deleteItem('contacts', c.id || c.date);
                              }
                            }}
                            className="p-1.5 text-red-500 hover:text-red-800 hover:bg-red-50 rounded-lg cursor-pointer"
                            title="Delete permanently"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {contacts.length === 0 && (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-gray-400 italic">No contact enquiries received yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards View */}
              <div className="grid grid-cols-1 md:hidden gap-4 text-left">
                {contacts.map((c) => (
                  <div key={c.id || c.date} className={`bg-amber-50/10 border border-amber-100 p-4 rounded-2xl space-y-2.5 shadow-sm ${c.status === 'resolved' ? 'opacity-60 bg-gray-50/5' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div className="min-w-0">
                        <h5 className="font-bold text-[#2A0D04] truncate max-w-[170px]">{c.name}</h5>
                        <p className="text-[10px] text-gray-400 mt-0.5 truncate max-w-[170px]">{c.email}</p>
                        <p className="text-[10px] text-[#6B2D17] font-bold mt-0.5">{c.phone}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shrink-0 ${
                        c.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700 animate-pulse'
                      }`}>
                        {c.status === 'resolved' ? 'Resolved' : 'New'}
                      </span>
                    </div>
                    <div className="text-[11px] pt-1.5 border-t border-amber-100/50 space-y-1 text-gray-600">
                      <div>Program: <span className="font-bold text-gray-700 block max-w-full truncate">{c.program}</span></div>
                      <div className="bg-white/70 p-2 rounded-lg border border-amber-100/50 text-[10px] mt-1 italic text-gray-500 break-words leading-relaxed">{c.message}</div>
                      <div className="text-[9px] text-gray-400 text-right mt-1.5">{c.date}</div>
                    </div>
                    <div className="flex justify-end gap-1.5 pt-1.5 border-t border-amber-100/50">
                      {c.status !== 'resolved' && (
                        <button
                          onClick={() => handleResolveInquiry(c)}
                          className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Resolve
                        </button>
                      )}
                      <button
                        onClick={() => { if (confirm('Delete inquiry permanently?')) deleteItem('contacts', c.id || c.date); }}
                        className="bg-red-50 text-red-500 hover:bg-red-100 border border-red-200 text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
                {contacts.length === 0 && (
                  <p className="text-center py-6 text-gray-400 italic text-xs">No contact enquiries received.</p>
                )}
              </div>

            </div>
          )}

          {/* ==================== 5. SYSTEM SETTINGS TAB ==================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 text-left">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#2A0D04]">System Configuration</h3>
                <p className="text-gray-500 text-xs mt-1">Configure your API gateways, database credentials, and payment settings.</p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* Razorpay Settings */}
                <div className="bg-amber-50/20 border border-amber-100 rounded-3xl p-6 space-y-4">
                  <h4 className="font-bold text-sm text-[#2a0d04] border-b border-amber-100/50 pb-2 flex items-center gap-2">
                    <span>💳</span> Razorpay Payment Gateway
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Razorpay Key ID</label>
                      <input
                        type="text"
                        value={settings.razorpayKey}
                        onChange={(e) => setSettings({ ...settings, razorpayKey: e.target.value })}
                        placeholder="rzp_test_... or rzp_live_..."
                        className="w-full bg-white border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#2A0D04]"
                      />
                    </div>
                  </div>
                </div>

                {/* Firebase Settings */}
                <div className="bg-amber-50/20 border border-amber-100 rounded-3xl p-6 space-y-4">
                  <h4 className="font-bold text-sm text-[#2a0d04] border-b border-amber-100/50 pb-2 flex items-center gap-2">
                    <span>🔥</span> Firebase Credentials
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">API Key</label>
                      <input
                        type="text"
                        value={settings.firebase.apiKey}
                        onChange={(e) => setSettings({
                          ...settings,
                          firebase: { ...settings.firebase, apiKey: e.target.value }
                        })}
                        className="w-full bg-white border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#2A0D04]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Auth Domain</label>
                      <input
                        type="text"
                        value={settings.firebase.authDomain}
                        onChange={(e) => setSettings({
                          ...settings,
                          firebase: { ...settings.firebase, authDomain: e.target.value }
                        })}
                        className="w-full bg-white border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#2A0D04]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Project ID</label>
                      <input
                        type="text"
                        value={settings.firebase.projectId}
                        onChange={(e) => setSettings({
                          ...settings,
                          firebase: { ...settings.firebase, projectId: e.target.value }
                        })}
                        className="w-full bg-white border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#2A0D04]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Storage Bucket</label>
                      <input
                        type="text"
                        value={settings.firebase.storageBucket}
                        onChange={(e) => setSettings({
                          ...settings,
                          firebase: { ...settings.firebase, storageBucket: e.target.value }
                        })}
                        className="w-full bg-white border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#2A0D04]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Messaging Sender ID</label>
                      <input
                        type="text"
                        value={settings.firebase.messagingSenderId}
                        onChange={(e) => setSettings({
                          ...settings,
                          firebase: { ...settings.firebase, messagingSenderId: e.target.value }
                        })}
                        className="w-full bg-white border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#2A0D04]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">App ID</label>
                      <input
                        type="text"
                        value={settings.firebase.appId}
                        onChange={(e) => setSettings({
                          ...settings,
                          firebase: { ...settings.firebase, appId: e.target.value }
                        })}
                        className="w-full bg-white border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#2A0D04]"
                      />
                    </div>
                  </div>
                </div>

                {/* ImageKit Settings */}
                <div className="bg-amber-50/20 border border-amber-100 rounded-3xl p-6 space-y-4">
                  <h4 className="font-bold text-sm text-[#2a0d04] border-b border-amber-100/50 pb-2 flex items-center gap-2">
                    <span>📷</span> ImageKit CDN Configuration
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Public Key</label>
                      <input
                        type="text"
                        value={settings.imagekit.publicKey}
                        onChange={(e) => setSettings({
                          ...settings,
                          imagekit: { ...settings.imagekit, publicKey: e.target.value }
                        })}
                        className="w-full bg-white border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#2A0D04]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">URL Endpoint</label>
                      <input
                        type="text"
                        value={settings.imagekit.urlEndpoint}
                        onChange={(e) => setSettings({
                          ...settings,
                          imagekit: { ...settings.imagekit, urlEndpoint: e.target.value }
                        })}
                        className="w-full bg-white border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#2A0D04]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Auth Endpoint</label>
                      <input
                        type="text"
                        value={settings.imagekit.authEndpoint}
                        onChange={(e) => setSettings({
                          ...settings,
                          imagekit: { ...settings.imagekit, authEndpoint: e.target.value }
                        })}
                        className="w-full bg-white border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#2A0D04]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-amber-50">
                  <button
                    type="submit"
                    className="bg-[#2A0D04] text-[#FFD95A] font-bold text-xs uppercase px-6 py-3 rounded-xl hover:bg-[#6B2D17] cursor-pointer transition-all shadow-md hover:shadow-lg active:scale-95"
                  >
                    Save System Settings
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>

      {/* Custom Modal for Adding Video Session */}
      {activeModuleIdForNewSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-md bg-white border border-amber-100 rounded-3xl p-6 shadow-2xl space-y-5 text-left relative my-auto">
            <button
              onClick={() => setActiveModuleIdForNewSession(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-serif text-lg font-bold text-[#2A0D04]">Add Video Session</h3>
              <p className="text-gray-500 text-xs mt-1">Enter the YouTube video details to publish this session.</p>
            </div>

            <form onSubmit={handleSaveNewSession} className="space-y-4">
              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Session Title</label>
                <input
                  type="text"
                  required
                  value={newSessionData.title}
                  onChange={(e) => setNewSessionData({ ...newSessionData, title: e.target.value })}
                  placeholder="e.g. Session 1: Foundation & Energy Cleansing"
                  className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#2A0D04]"
                />
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">YouTube Video ID</label>
                <input
                  type="text"
                  required
                  value={newSessionData.videoId}
                  onChange={(e) => setNewSessionData({ ...newSessionData, videoId: e.target.value })}
                  placeholder="e.g. Bk2aXAlT7b0 (from url watch?v=Bk2aXAlT7b0)"
                  className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#2A0D04]"
                />
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Session Description</label>
                <textarea
                  rows="3"
                  value={newSessionData.desc}
                  onChange={(e) => setNewSessionData({ ...newSessionData, desc: e.target.value })}
                  placeholder="Write a brief explanation of what is taught in this session..."
                  className="w-full bg-amber-50/20 border border-amber-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none resize-none focus:border-[#2A0D04]"
                />
              </div>

              <div className="pt-2 border-t border-amber-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModuleIdForNewSession(null)}
                  className="border border-amber-100 text-gray-500 font-bold text-xs uppercase px-4 py-2.5 rounded-xl hover:bg-amber-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#2A0D04] text-[#FFD95A] font-bold text-xs uppercase px-5 py-2.5 rounded-xl cursor-pointer hover:bg-[#6B2D17]"
                >
                  Save Video Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
