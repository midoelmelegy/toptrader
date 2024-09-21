import React, { useState, useContext, useEffect } from 'react';
import { VaultContext, VaultProvider } from '../../contexts/VaultContext';
import { auth, db } from '../../lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import VaultCreationPanel from './VaultCreationPanel';
import VaultManagementPanel from './VaultManagementPanel';
import VaultJoinPanel from './VaultJoinPanel';
import { Vault } from '@/types/Vault';

const CollaborativeTradingWidgetInner: React.FC = () => {
  const vaultContext = useContext(VaultContext);

  if (!vaultContext) {
    return <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>VaultContext is undefined. Make sure CollaborativeTradingWidget is wrapped in a VaultProvider.</AlertDescription></Alert>;
  }

  const { vaults, createVault, joinVault, closeVault } = vaultContext;

  const [user, setUser] = useState<User | null>(null);
  const [widgetState, setWidgetState] = useState<'create' | 'manage' | 'join'>('create');
  const [error, setError] = useState<string | null>(null);
  const [currentVault, setCurrentVault] = useState<Vault | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchVaults = async () => {
      if (user) {
        const vaultsRef = collection(db, 'vaults');
        const q = query(vaultsRef, where('creatorId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const userVault = querySnapshot.docs[0].data() as Vault;
          setCurrentVault(userVault);
          setWidgetState('manage');
        } else {
          const availableVaults = vaults.filter(vault => vault.creatorId !== user.uid);
          if (availableVaults.length > 0) {
            setCurrentVault(availableVaults[0]);
            setWidgetState('join');
          } else {
            setWidgetState('create');
          }
        }
      }
    };

    fetchVaults();
  }, [user, vaults]);

  const initiatePayment = async (amount: number): Promise<boolean> => {
    // Simulating a payment process
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true); // Always return true for mock payment
      }, 2000);
    });
  };

  const handleCreateVault = async (vaultData: Partial<Vault>) => {
    if (!user) {
      setError('You must be logged in to create a vault.');
      return;
    }

    try {
      const newVault: Vault = {
        ...vaultData,
        id: Date.now().toString(),
        creatorId: user.uid,
        participants: [{ userId: user.uid, amount: vaultData.investmentAmount || 0 }],
        createdAt: new Date(),
      } as Vault;
      
      const docRef = await addDoc(collection(db, 'vaults'), newVault);
      createVault({ ...newVault, id: docRef.id });
      setCurrentVault({ ...newVault, id: docRef.id });
      setWidgetState('manage');
    } catch (error) {
      console.error('Error creating vault:', error);
      setError('Error creating vault. Please try again.');
    }
  };

  const handleJoinVault = async (amount: number) => {
    if (user && currentVault) {
      try {
        await joinVault(currentVault.id, user.uid, amount);
        setWidgetState('manage');
      } catch (error) {
        setError('Error joining vault. Please try again.');
        console.error('Error joining vault:', error);
      }
    }
  };

  const handleCloseVault = async () => {
    if (currentVault) {
      try {
        await closeVault(currentVault.id);
        setCurrentVault(null);
        setWidgetState('create');
      } catch (error) {
        setError('Error closing vault. Please try again.');
        console.error('Error closing vault:', error);
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {widgetState === 'create' && (
          <VaultCreationPanel onCreateVault={handleCreateVault} onInitiatePayment={initiatePayment} />
        )}
        {widgetState === 'manage' && currentVault && (
          <VaultManagementPanel vault={currentVault} onCloseVault={handleCloseVault} />
        )}
        {widgetState === 'join' && currentVault && (
          <VaultJoinPanel vault={currentVault} onJoinVault={handleJoinVault} />
        )}
      </CardContent>
    </Card>
  );
};

const CollaborativeTradingWidget: React.FC = () => {
  return (
    <VaultProvider>
      <CollaborativeTradingWidgetInner />
    </VaultProvider>
  );
};

export default CollaborativeTradingWidget;
