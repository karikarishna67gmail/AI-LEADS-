import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { UserProfile, ICPSettings, ProspectLead, SearchRun } from '../types';

// ==================== USER PROFILE ====================

export function subscribeUserProfile(userId: string, onData: (profile: UserProfile | null) => void, onError?: (err: any) => void) {
  const path = `users/${userId}`;
  const userDocRef = doc(db, 'users', userId);
  return onSnapshot(
    userDocRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onData(snapshot.data() as UserProfile);
      } else {
        onData(null);
      }
    },
    (error) => {
      console.warn('User Profile listener notice:', error.message);
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  const path = `users/${profile.id}`;
  try {
    const userDocRef = doc(db, 'users', profile.id);
    await setDoc(userDocRef, {
      ...profile,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// ==================== CAMPAIGNS ====================

export function subscribeCampaigns(userId: string, onData: (campaigns: ICPSettings[]) => void) {
  const path = `users/${userId}/campaigns`;
  const campaignsRef = collection(db, 'users', userId, 'campaigns');
  return onSnapshot(
    campaignsRef,
    (snapshot) => {
      const campaigns: ICPSettings[] = [];
      snapshot.forEach((docSnap) => {
        campaigns.push(docSnap.data() as ICPSettings);
      });
      onData(campaigns);
    },
    (error) => {
      console.warn('Campaigns listener notice:', error.message);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function saveCampaignToFirestore(userId: string, campaign: ICPSettings): Promise<void> {
  const campaignId = campaign.id || `camp-${Date.now()}`;
  const path = `users/${userId}/campaigns/${campaignId}`;
  try {
    const campaignRef = doc(db, 'users', userId, 'campaigns', campaignId);
    await setDoc(campaignRef, {
      ...campaign,
      id: campaignId,
      userId,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteCampaignFromFirestore(userId: string, campaignId: string): Promise<void> {
  const path = `users/${userId}/campaigns/${campaignId}`;
  try {
    const campaignRef = doc(db, 'users', userId, 'campaigns', campaignId);
    await deleteDoc(campaignRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// ==================== PROSPECTS ====================

export function subscribeProspects(userId: string, onData: (prospects: ProspectLead[]) => void) {
  const path = `users/${userId}/prospects`;
  const prospectsRef = collection(db, 'users', userId, 'prospects');
  return onSnapshot(
    prospectsRef,
    (snapshot) => {
      const prospects: ProspectLead[] = [];
      snapshot.forEach((docSnap) => {
        prospects.push(docSnap.data() as ProspectLead);
      });
      onData(prospects);
    },
    (error) => {
      console.warn('Prospects listener notice:', error.message);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function saveProspectToFirestore(userId: string, prospect: ProspectLead): Promise<void> {
  const prospectId = prospect.id;
  const path = `users/${userId}/prospects/${prospectId}`;
  try {
    const prospectRef = doc(db, 'users', userId, 'prospects', prospectId);
    await setDoc(prospectRef, {
      ...prospect,
      userId,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function saveProspectsBatchToFirestore(userId: string, prospects: ProspectLead[]): Promise<void> {
  const promises = prospects.map(p => saveProspectToFirestore(userId, p));
  await Promise.all(promises);
}

export async function updateProspectInFirestore(userId: string, prospectId: string, updates: Partial<ProspectLead>): Promise<void> {
  const path = `users/${userId}/prospects/${prospectId}`;
  try {
    const prospectRef = doc(db, 'users', userId, 'prospects', prospectId);
    await updateDoc(prospectRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteProspectFromFirestore(userId: string, prospectId: string): Promise<void> {
  const path = `users/${userId}/prospects/${prospectId}`;
  try {
    const prospectRef = doc(db, 'users', userId, 'prospects', prospectId);
    await deleteDoc(prospectRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// ==================== SEARCH HISTORY ====================

export function subscribeSearches(userId: string, onData: (searches: SearchRun[]) => void) {
  const path = `users/${userId}/searches`;
  const searchesRef = collection(db, 'users', userId, 'searches');
  return onSnapshot(
    searchesRef,
    (snapshot) => {
      const searches: SearchRun[] = [];
      snapshot.forEach((docSnap) => {
        searches.push(docSnap.data() as SearchRun);
      });
      // Sort newest first
      searches.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      onData(searches);
    },
    (error) => {
      console.warn('Searches listener notice:', error.message);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function saveSearchRunToFirestore(userId: string, searchRun: SearchRun): Promise<void> {
  const searchId = searchRun.id || `search-${Date.now()}`;
  const path = `users/${userId}/searches/${searchId}`;
  try {
    const searchRef = doc(db, 'users', userId, 'searches', searchId);
    await setDoc(searchRef, {
      ...searchRun,
      id: searchId,
      userId,
      createdAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
