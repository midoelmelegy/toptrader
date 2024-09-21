'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Assuming these are actual components
// If they are from a library or custom, ensure they are imported properly
const ChartContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full">{children}</div>
);

const ChartTooltipContent = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-md shadow-lg">
        <p>{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

// Mock data for the PieChart
const data = [
  { name: "Bitcoin", value: 50, color: "#F7931A" },
  { name: "Ethereum", value: 30, color: "#627EEA" },
  { name: "Litecoin", value: 20, color: "#BFBBBB" },
];

export function SpotPortfolio() {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-3xl font-bold">Crypto Portfolio</CardTitle>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="w-6 h-6" />
          <span className="sr-only">Settings</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Value" value="$123,456.78" />
          <StatCard title="24h Change" value="+2.34%" valueColor="text-green-500" />
          <StatCard title="ROI (All Time)" value="+45.67%" valueColor="text-green-500" />
          <StatCard title="Unrealized Gains" value="$34,567.89" valueColor="text-green-500" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Asset Allocation</h3>
            <ChartContainer>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Holdings</h3>
            <div className="space-y-4">
              <HoldingCard
                color="#F7931A"
                name="Bitcoin"
                amount="1.23456"
                value="$60,000.00"
              />
              <HoldingCard
                color="#627EEA"
                name="Ethereum"
                amount="4.56789"
                value="$50,000.00"
              />
              <HoldingCard
                color="#BFBBBB"
                name="Litecoin"
                amount="10.00000"
                value="$13,456.78"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const StatCard: React.FC<{ title: string; value: string; valueColor?: string }> = ({ title, value, valueColor }) => (
  <div className="bg-gray-100 p-4 rounded-lg">
    <div className="text-sm font-medium text-gray-500">{title}</div>
    <div className={`text-2xl font-bold ${valueColor || ''}`}>{value}</div>
  </div>
);

const HoldingCard: React.FC<{ color: string; name: string; amount: string; value: string }> = ({ color, name, amount, value }) => (
  <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-full" style={{ backgroundColor: color }}></div>
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-gray-500">{amount}</div>
      </div>
    </div>
    <div className="text-right font-semibold">{value}</div>
  </div>
);

// Custom label for the Pie chart
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Dummy settings icon
function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
