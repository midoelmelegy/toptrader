import React, { useState } from 'react';
import { Zap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { subscribe } from "../lib/subscriptionService";

// Modal for subscription plans
const SubscriptionModal = ({ isOpen, onClose, onSelect }: { isOpen: boolean; onClose: () => void; onSelect: (plan: string) => void }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black">Boost Your XP</DialogTitle> {/* Explicitly set text-black */}
          <DialogDescription className="text-gray-700">Choose your subscription plan:</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Button
            size="lg"
            className="bg-blue-500 text-white hover:bg-blue-600" // Blue button styling
            onClick={() => onSelect("1 Month - 0.01 ETH")}
          >
            1 Month - 0.01 ETH
          </Button>
          <Button
            size="lg"
            className="bg-blue-500 text-white hover:bg-blue-600" // Blue button styling
            onClick={() => onSelect("12 Months - 0.1 ETH")}
          >
            12 Months - 0.1 ETH
          </Button>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Confirmation Modal
const ConfirmationModal = ({ isOpen, onClose, selectedPlan, onConfirm }: { isOpen: boolean; onClose: () => void; selectedPlan: string; onConfirm: () => void }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Subscription</DialogTitle>
          <DialogDescription>Are you sure you want to subscribe to {selectedPlan}?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onConfirm} className="bg-blue-500 text-white hover:bg-blue-600">
            Confirm
          </Button>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const BoostXPButton = () => {
  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleOpenSubscriptionModal = () => {
    setSubscriptionModalOpen(true);
  };

  const handleCloseSubscriptionModal = () => {
    setSubscriptionModalOpen(false);
  };

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    setSubscriptionModalOpen(false);
    setConfirmationModalOpen(true);
  };

  const handleConfirmSubscription = async () => {
    try {
      let months = 0;
      let value = "";

      if (selectedPlan === "1 Month - 0.01 ETH") {
        months = 1;
        value = "0.01";
      } else if (selectedPlan === "12 Months - 0.1 ETH") {
        months = 12;
        value = "0.1";
      }

      await subscribe(months, value);
      alert(`You have successfully subscribed to ${selectedPlan}`);

    } catch (error) {
      alert(`Subscription failed :(`);
      console.log(error);
    } finally {
      setConfirmationModalOpen(false);
      setSelectedPlan(null);
    }
  };

  const handleCloseConfirmationModal = () => {
    setConfirmationModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div>
      {/* Boost Button */}
      <div className="fixed bottom-8 left-8">
        <Button
          size="lg"
          className="rounded-full shadow-lg bg-blue-500 text-white hover:bg-blue-600" // Force blue color always
          onClick={handleOpenSubscriptionModal}
        >
          <Zap className="mr-2 h-5 w-5" /> Boost Your XP
        </Button>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={handleCloseSubscriptionModal}
        onSelect={handleSelectPlan}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
        selectedPlan={selectedPlan!}
        onConfirm={handleConfirmSubscription}
      />
    </div>
  );
};
