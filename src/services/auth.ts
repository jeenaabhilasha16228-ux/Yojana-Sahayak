import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserProfile } from '../types';

// Check for Supabase environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

let supabase: SupabaseClient | null = null;
if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
  }
}

// Local storage keys for standalone / demo / fallback session
const SESSION_STORAGE_KEY = 'yojana_sahayak_auth_session';
const USERS_STORAGE_KEY = 'yojana_sahayak_users_db';
const PROFILES_STORAGE_KEY = 'yojana_sahayak_profiles_db';

// Built-in Demo Profiles for Judges / Hackathon Demonstration
export const DEMO_PROFILES: Record<string, UserProfile> = {
  student: {
    id: 'demo-student-user',
    email: 'rahul.student@example.gov.in',
    name: 'Rahul Sharma',
    age: 20,
    gender: 'male',
    state: 'Uttarakhand',
    district: 'Dehradun',
    occupation: 'Student',
    annualIncome: 220000,
    isStudent: true,
    isFarmer: false,
    isArtisan: false,
    hasAgriLand: false,
    hasGirlChildUnder10: false,
    paysIncomeTax: false,
    isGovtEmployee: false,
    socialCategory: 'OBC',
    createdAt: new Date().toISOString()
  },
  farmer: {
    id: 'demo-farmer-user',
    email: 'sunita.farmer@example.gov.in',
    name: 'Sunita Devi',
    age: 38,
    gender: 'female',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    occupation: 'Farmer',
    annualIncome: 140000,
    isStudent: false,
    isFarmer: true,
    isArtisan: false,
    hasAgriLand: true,
    hasGirlChildUnder10: true,
    paysIncomeTax: false,
    isGovtEmployee: false,
    socialCategory: 'SC',
    createdAt: new Date().toISOString()
  }
};

// Helper: load local users database
function getLocalUsersDb(): Record<string, { id: string; email: string; passwordHash: string; name: string }> {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalUsersDb(db: Record<string, any>) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(db));
}

function getLocalProfilesDb(): Record<string, UserProfile> {
  try {
    const raw = localStorage.getItem(PROFILES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalProfilesDb(db: Record<string, UserProfile>) {
  localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(db));
}

// Simple salt/hash for standalone local accounts (avoiding raw plaintext)
async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(password + '_yojana_salt_2026');
  const hashBuf = await crypto.subtle.digest('SHA-256', data);
  const hashArr = Array.from(new Uint8Array(hashBuf));
  return hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const authService = {
  // Get active session user
  getCurrentUser(): UserProfile | null {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  // Sign up new user
  async signUp(name: string, email: string, password: string): Promise<UserProfile> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName || !cleanEmail || !password) {
      throw new Error('Please enter name, email, and password');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // If Supabase is active, use Supabase Auth
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password: password,
        options: {
          data: { name: cleanName }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      const userProfile: UserProfile = {
        id: data.user?.id || `user-${Date.now()}`,
        email: cleanEmail,
        name: cleanName,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userProfile));
      return userProfile;
    }

    // Local secure session provider
    const usersDb = getLocalUsersDb();
    if (usersDb[cleanEmail]) {
      throw new Error('An account with this email already exists');
    }

    const passwordHash = await hashPassword(password);
    const userId = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    usersDb[cleanEmail] = {
      id: userId,
      email: cleanEmail,
      passwordHash,
      name: cleanName
    };
    saveLocalUsersDb(usersDb);

    const newProfile: UserProfile = {
      id: userId,
      email: cleanEmail,
      name: cleanName,
      createdAt: new Date().toISOString()
    };

    const profilesDb = getLocalProfilesDb();
    profilesDb[userId] = newProfile;
    saveLocalProfilesDb(profilesDb);

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newProfile));
    return newProfile;
  },

  // Login existing user
  async login(email: string, password: string): Promise<UserProfile> {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      throw new Error('Please provide email and password');
    }

    // Supabase Auth
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: password
      });

      if (error) {
        throw new Error(error.message);
      }

      const existingProfiles = getLocalProfilesDb();
      const existing = existingProfiles[data.user.id] || {
        id: data.user.id,
        email: cleanEmail,
        name: data.user.user_metadata?.name || cleanEmail.split('@')[0],
        createdAt: new Date().toISOString()
      };

      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(existing));
      return existing;
    }

    // Local secure session
    const usersDb = getLocalUsersDb();
    const user = usersDb[cleanEmail];
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const inputHash = await hashPassword(password);
    if (user.passwordHash !== inputHash) {
      throw new Error('Invalid email or password');
    }

    const profilesDb = getLocalProfilesDb();
    let profile = profilesDb[user.id];
    if (!profile) {
      profile = {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: new Date().toISOString()
      };
      profilesDb[user.id] = profile;
      saveLocalProfilesDb(profilesDb);
    }

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(profile));
    notifyAuthListeners(profile);
    return profile;
  },

  // Instant login using demo personas for judge inspection
  loginAsDemo(persona: 'student' | 'farmer'): UserProfile {
    const demo = DEMO_PROFILES[persona];
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(demo));
    notifyAuthListeners(demo);
    return demo;
  },

  // Logout
  async logout(): Promise<void> {
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(SESSION_STORAGE_KEY);
    notifyAuthListeners(null);
  },

  // Forgot password
  async resetPassword(email: string): Promise<string> {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      throw new Error('Please enter your email address');
    }

    if (supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail);
      if (error) throw new Error(error.message);
      return 'Password reset link sent to your email';
    }

    return 'If an account exists with this email, password reset instructions have been generated.';
  },

  // Update profile
  updateProfile(userId: string, updates: Partial<UserProfile>): UserProfile {
    const profilesDb = getLocalProfilesDb();
    const current = profilesDb[userId] || authService.getCurrentUser() || {
      id: userId,
      email: '',
      name: '',
      createdAt: new Date().toISOString()
    };

    const updated: UserProfile = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    profilesDb[userId] = updated;
    saveLocalProfilesDb(profilesDb);

    // If current session is this user, update active session
    const active = authService.getCurrentUser();
    if (active && active.id === userId) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated));
    }

    notifyAuthListeners(updated);
    return updated;
  },

  // Alias for logout
  async signOut(): Promise<void> {
    await this.logout();
    notifyAuthListeners(null);
  },

  // Listen to auth changes
  onAuthStateChange(callback: (user: UserProfile | null) => void): () => void {
    authListeners.push(callback);
    return () => {
      authListeners = authListeners.filter(l => l !== callback);
    };
  }
};

let authListeners: Array<(user: UserProfile | null) => void> = [];
function notifyAuthListeners(user: UserProfile | null) {
  authListeners.forEach(listener => {
    try {
      listener(user);
    } catch (err) {
      console.error('Error in auth listener:', err);
    }
  });
}
