import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, signOutUser, testFirestoreConnection } from '../lib/firebase';
import { subscribeUserProfile, saveUserProfile } from '../lib/firestoreService';
import { UserProfile } from '../types';

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  userProfile: UserProfile;
  isLoading: boolean;
  isFirebaseReady: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const DEFAULT_PROFILE: UserProfile = {
  id: 'guest-demo-user',
  name: 'Rajesh Sharma',
  email: 'founder@restaurantgrowth.in',
  organization: 'F&B Growth Systems',
  role: 'Founder & Growth Director',
  tier: 'growth',
  searchesRemaining: 48,
  searchesTotal: 50,
  monthlyLeadQuota: 1000,
  leadsUsedThisMonth: 142,
  onboardingCompleted: true,
};

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  userProfile: DEFAULT_PROFILE,
  isLoading: true,
  isFirebaseReady: false,
  loginWithGoogle: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFirebaseReady, setIsFirebaseReady] = useState<boolean>(false);

  // Validate Firestore Connection on boot
  useEffect(() => {
    testFirestoreConnection().then((connected) => {
      setIsFirebaseReady(connected);
    });
  }, []);

  // Subscribe to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setFirebaseUser(currentUser);

      if (currentUser) {
        // Logged in via Firebase
        const userId = currentUser.uid;
        
        // Listen to User Profile in Firestore
        const unsubProfile = subscribeUserProfile(
          userId,
          async (profile) => {
            if (profile) {
              setUserProfile(profile);
            } else {
              // First time signing in, initialize default profile
              const initialProfile: UserProfile = {
                id: userId,
                name: currentUser.displayName || 'Growth Executive',
                email: currentUser.email || 'user@example.com',
                organization: 'My Enterprise',
                role: 'Founder / Head of Growth',
                tier: 'growth',
                searchesRemaining: 50,
                searchesTotal: 50,
                monthlyLeadQuota: 1000,
                leadsUsedThisMonth: 0,
                onboardingCompleted: false,
                avatarUrl: currentUser.photoURL || undefined,
              };
              await saveUserProfile(initialProfile);
              setUserProfile(initialProfile);
            }
            setIsLoading(false);
          },
          (err) => {
            console.warn('Profile read warning, using local profile state:', err);
            setIsLoading(false);
          }
        );

        return () => {
          unsubProfile();
        };
      } else {
        // Guest / Demo user mode
        setUserProfile(DEFAULT_PROFILE);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogleHandler = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error('Google Sign In failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      await signOutUser();
      setUserProfile(DEFAULT_PROFILE);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfileHandler = async (updates: Partial<UserProfile>) => {
    const updated: UserProfile = {
      ...userProfile,
      ...updates,
    };
    setUserProfile(updated);
    if (firebaseUser) {
      await saveUserProfile(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        userProfile,
        isLoading,
        isFirebaseReady,
        loginWithGoogle: loginWithGoogleHandler,
        logout: logoutHandler,
        updateProfile: updateProfileHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
