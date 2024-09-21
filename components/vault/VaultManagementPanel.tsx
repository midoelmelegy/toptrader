import React from 'react';
import { Button } from "@/components/ui/button";
import { Vault } from '../../types/Vault';

interface VaultManagementPanelProps {
  vault: Vault;
  onCloseVault: () => void;
}

const VaultManagementPanel: React.FC<VaultManagementPanelProps> = ({ vault, onCloseVault }) => {
  return (
    <div className="space-y-4 no-drag">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{vault.name}</h2>
      <p className="text-gray-700 dark:text-gray-300">Investment Amount: ${vault.investmentAmount}</p>
      <p className="text-gray-700 dark:text-gray-300">Trade Time: {vault.tradeTime.toLocaleString()}</p>
      <p className="text-gray-700 dark:text-gray-300">Participants: {vault.participants.length}</p>
      <Button onClick={onCloseVault} variant="destructive" className="w-full bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600">Close Vault</Button>
    </div>
  );
};

export default VaultManagementPanel;