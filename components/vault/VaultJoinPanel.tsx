import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Vault } from '../../types/Vault';

interface VaultJoinPanelProps {
  vault: Vault;
  onJoinVault: (amount: number) => void;
}

const VaultJoinPanel: React.FC<VaultJoinPanelProps> = ({ vault, onJoinVault }) => {
  const [joinAmount, setJoinAmount] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleJoin = () => {
    setError(null);
    const amount = parseFloat(joinAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid investment amount.');
      return;
    }
    onJoinVault(amount);
  };

  return (
    <div className="space-y-4 no-drag">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Join Vault: {vault.name}</h2>
      {error && (
        <Alert variant="destructive" className="bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800">
          <AlertDescription className="text-red-700 dark:text-red-300">{error}</AlertDescription>
        </Alert>
      )}
      <p className="text-gray-700 dark:text-gray-300">Required Investment: ${vault.investmentAmount}</p>
      <p className="text-gray-700 dark:text-gray-300">Trade Time: {vault.tradeTime.toLocaleString()}</p>
      <div className="space-y-2">
        <Label htmlFor="join-amount" className="text-gray-700 dark:text-gray-300">Your Investment Amount</Label>
        <Input
          id="join-amount"
          type="number"
          value={joinAmount}
          onChange={(e) => setJoinAmount(e.target.value)}
          placeholder="Enter your investment amount"
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
        />
      </div>
      <Button onClick={handleJoin} className="w-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">Join Vault</Button>
    </div>
  );
};

export default VaultJoinPanel;