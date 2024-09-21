import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Vault } from '../../types/Vault';

interface VaultCreationPanelProps {
  onCreateVault: (vaultData: Partial<Vault>) => Promise<void>;
  onInitiatePayment: (amount: number) => Promise<boolean>;
}

const VaultCreationPanel: React.FC<VaultCreationPanelProps> = ({ onCreateVault, onInitiatePayment }) => {
  const [name, setName] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [tradeTime, setTradeTime] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    if (!name || !investmentAmount || !tradeTime) {
      setError('Please fill in all fields.');
      return;
    }

    const amount = parseFloat(investmentAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid investment amount.');
      return;
    }

    const paymentSuccessful = await onInitiatePayment(amount);
    if (paymentSuccessful) {
      const vaultData: Partial<Vault> = { 
        name,
        investmentAmount: amount,
        tradeTime: new Date(tradeTime),
      };
      await onCreateVault(vaultData);
    } else {
      setError('Payment failed. Please try again.');
    }
  };

  return (
    <div className="space-y-4 no-drag">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create a New Vault</h2>
      {error && (
        <Alert variant="destructive" className="bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800">
          <AlertDescription className="text-red-700 dark:text-red-300">{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="vault-name" className="text-gray-700 dark:text-gray-300">Vault Name</Label>
        <Input
          id="vault-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter vault name"
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="investment-amount" className="text-gray-700 dark:text-gray-300">Investment Amount</Label>
        <Input
          id="investment-amount"
          type="number"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(e.target.value)}
          placeholder="Enter investment amount"
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="trade-time" className="text-gray-700 dark:text-gray-300">Trade Time</Label>
        <Input
          id="trade-time"
          type="datetime-local"
          value={tradeTime}
          onChange={(e) => setTradeTime(e.target.value)}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
        />
      </div>
      <Button onClick={handleSubmit} className="w-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">Create Vault</Button>
    </div>
  );
};

export default VaultCreationPanel;