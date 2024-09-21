import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export function TradeSignal() {
  const [formValues, setFormValues] = useState({
    assetSymbol: '',
    assetName: '',
    action: 'buy',
    priceTarget: '',
    expiration: '',
    comment: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleActionChange = (value: string) => {
    setFormValues({ ...formValues, action: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Trade Signal Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <div className="flex justify-between">
              <span className="font-semibold">Asset:</span>
              <span>{formValues.assetSymbol} - {formValues.assetName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Action:</span>
              <span className={formValues.action === 'buy' ? 'text-green-500' : 'text-red-500'}>
                {formValues.action.charAt(0).toUpperCase() + formValues.action.slice(1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Price Target:</span>
              <span>${formValues.priceTarget}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Expiration Date:</span>
              <span>{formValues.expiration}</span>
            </div>
          </div>
          <div>
            <span className="font-semibold">Comment:</span>
            <p className="mt-1 text-gray-600 dark:text-gray-300">{formValues.comment || 'No comment provided'}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
            variant="outline"
            className="w-full no-drag"
          >
            Edit
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-2xl font-bold">Trade Signal</CardTitle>
        <Button variant="ghost" size="icon" className="no-drag">
          <MoveVerticalIcon className="w-5 h-5" />
          <span className="sr-only">More options</span>
        </Button>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.stopPropagation();
            handleSubmit(e);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="asset" className="text-sm font-medium">Asset</Label>
            <div className="flex gap-2">
              <Input 
                id="assetSymbol" 
                placeholder="Ticker symbol" 
                value={formValues.assetSymbol} 
                onChange={(e) => {
                  e.stopPropagation();
                  handleChange(e);
                }}
                className="bg-gray-100 dark:bg-gray-700 no-drag"
                onClick={(e) => e.stopPropagation()}
              />
              <Input 
                id="assetName" 
                placeholder="Asset name" 
                value={formValues.assetName} 
                onChange={(e) => {
                  e.stopPropagation();
                  handleChange(e);
                }}
                className="bg-gray-100 dark:bg-gray-700 no-drag"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="action" className="text-sm font-medium">Action</Label>
            <RadioGroup 
              id="action" 
              defaultValue="buy" 
              className="flex gap-4 no-drag"
              onValueChange={(value) => {
                handleActionChange(value);
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center">
                <RadioGroupItem
                  id="action-buy"
                  value="buy"
                  checked={formValues.action === 'buy'}
                  className="no-drag"
                  onClick={(e) => e.stopPropagation()}
                />
                <Label htmlFor="action-buy" className="ml-2 font-medium text-green-500">
                  Buy
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem
                  id="action-sell"
                  value="sell"
                  checked={formValues.action === 'sell'}
                  className="no-drag"
                  onClick={(e) => e.stopPropagation()}
                />
                <Label htmlFor="action-sell" className="ml-2 font-medium text-red-500">
                  Sell
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="priceTarget" className="text-sm font-medium">Price Target</Label>
            <Input 
              id="priceTarget" 
              type="number" 
              placeholder="Enter price target" 
              value={formValues.priceTarget} 
              onChange={(e) => {
                e.stopPropagation();
                handleChange(e);
              }}
              className="bg-gray-100 dark:bg-gray-700 no-drag"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiration" className="text-sm font-medium">Expiration</Label>
            <Input 
              id="expiration" 
              type="date" 
              value={formValues.expiration} 
              onChange={(e) => {
                e.stopPropagation();
                handleChange(e);
              }}
              className="bg-gray-100 dark:bg-gray-700 no-drag"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-sm font-medium">Comment</Label>
            <Textarea 
              id="comment" 
              placeholder="Add your rationale" 
              value={formValues.comment} 
              onChange={(e) => {
                e.stopPropagation();
                handleChange(e);
              }}
              className="bg-gray-100 dark:bg-gray-700 no-drag"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800 no-drag"
            onClick={(e) => e.stopPropagation()}
          >
            Share Signal
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <ClockIcon className="w-4 h-4" />
          <span>Signal valid until {formValues.expiration || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckIcon className="w-4 h-4" />
          <span>Verified</span>
        </div>
      </CardFooter>
    </Card>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MoveVerticalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  );
}
