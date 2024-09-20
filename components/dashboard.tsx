'use client'

// Current Version: 1.0. Update this comment version to 1.1 when you make changes to the code.

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Responsive, WidthProvider, Layout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { X, Sun, Moon } from 'lucide-react'

// Components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, Settings, LogOut } from 'lucide-react'

// Account Settings dropdown
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Widgets
import { TradingVaultComponent } from './widgets/TradingVault'
import { RankingSystemComponent } from './widgets/RankingSystem'
import { CustomMetricsComponent } from './widgets/CustomMetrics'
import { ChatComponent } from './widgets/Chat'

import { Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const ResponsiveGridLayout = WidthProvider(Responsive)

// Update the widgets object to use string keys
const widgets: Widgets = {
  tradingVault: { type: 'tradingVault', title: 'Trading Vault', w: 4, h: 4, component: TradingVaultComponent },
  rankingSystem: { type: 'rankingSystem', title: 'Ranking System', w: 4, h: 4, component: RankingSystemComponent },
  customMetrics: { type: 'customMetrics', title: 'Custom Metrics', w: 3, h: 3, component: CustomMetricsComponent },
  chat: { type: 'chat', title: 'Chat', w: 3, h: 4, component: ChatComponent },
}

// Add these type definitions
type WidgetComponentType = React.ComponentType<any>;

interface WidgetDefinition {
  type: string;
  title: string;
  w: number;
  h: number;
  component: WidgetComponentType;
}

interface Widgets {
  [key: string]: WidgetDefinition;
}

// Add this component after the imports
const WidgetPreview: React.FC<WidgetDefinition> = ({ type, title, component: Component }) => (
  <div className="p-2 rounded cursor-move">
    <h3 className="text-sm font-medium mb-2">{title}</h3>
    <div className="h-24 overflow-hidden">
      <Component />
    </div>
  </div>
);

export function DashboardComponent() {
  const [layout, setLayout] = useState<Array<Layout & { type?: string }>>([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const onLayoutChange = useCallback((newLayout: Layout[]) => {
    setLayout(newLayout.map(item => {
      const existingItem = layout.find(layoutItem => layoutItem.i === item.i);
      return {...item, type: existingItem?.type || item.i.split('-')[0]};
    }));
  }, [layout]);

  const onDragStart = useCallback((e: React.DragEvent, widgetType: string) => {
    e.dataTransfer.setData('text/plain', widgetType);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const widgetType = e.dataTransfer.getData('text');
      if (widgetType in widgets) {
        // Calculate total occupied grid squares
        const totalOccupied = layout.reduce((acc, item) => acc + item.w * item.h, 0);
        const totalGridSize = 12 * 10; // cols * maxRows

        // Calculate new widget size
        const newWidgetSize = widgets[widgetType].w * widgets[widgetType].h;

        if (totalOccupied + newWidgetSize <= totalGridSize) {
          const newWidget = {
            i: `${widgetType}-${Date.now()}`,
            x: (layout.length * 2) % 12,
            y: Infinity,
            w: widgets[widgetType].w,
            h: widgets[widgetType].h,
            minW: 1,
            maxW: 12,
            minH: 1,
            maxH: 10,
            type: widgetType,
          };
          setLayout((prevLayout) => [...prevLayout, newWidget]);
        } else {
          alert('Not enough space to add this widget.');
        }
      }
    },
    [layout]
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [widgetToDelete, setWidgetToDelete] = useState<string | null>(null);

  const handleDeleteWidget = useCallback((widgetId: string) => {
    setWidgetToDelete(widgetId);
    setDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (widgetToDelete) {
      setLayout((prevLayout) => prevLayout.filter((item) => item.i !== widgetToDelete));
      setWidgetToDelete(null);
    }
    setDialogOpen(false);
  }, [widgetToDelete]);

  const renderWidget = useCallback((widget: any) => {
    if (!widget || !widget.type) {
      return <div>Invalid widget</div>;
    }
    const WidgetComponent = widgets[widget.type]?.component;
    return WidgetComponent ? <WidgetComponent /> : <div>Widget not found</div>;
  }, []);

  const saveLayout = useCallback(() => {
    localStorage.setItem('dashboardLayout', JSON.stringify(layout));
  }, [layout]);

  const loadLayout = useCallback(() => {
    const savedLayout = localStorage.getItem('dashboardLayout');
    if (savedLayout) {
      setLayout(JSON.parse(savedLayout));
    }
  }, []);

  useEffect(() => {
    loadLayout();
  }, [loadLayout]);

  const deployLayout = useCallback(async () => {
    try {
      const response = await fetch('/api/deploy-dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ layout }),
      });
      if (response.ok) {
        // Show success message
        alert('Dashboard deployed successfully!');
      } else {
        // Show error message
        alert('Failed to deploy dashboard. Please try again.');
      }
    } catch (error) {
      console.error('Error deploying dashboard:', error);
      alert('An error occurred while deploying the dashboard.');
    }
  }, [layout]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.toggle('dark');
    const newTheme = root.classList.contains('dark') ? 'dark' : 'light';
    setTheme(newTheme);
  }, []);

  return (
    <div className="flex h-screen bg-apple-gray-100 dark:bg-apple-gray-900">
      <aside className="w-64 p-6 bg-white dark:bg-apple-gray-800 shadow-apple rounded-r-apple">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-apple-gray-900 dark:text-white">Widgets</h2>
        </div>
        <div className="space-y-4">
          {Object.entries(widgets).map(([key, widget]) => (
            <div
              key={key}
              draggable
              onDragStart={(e) => onDragStart(e, key)}
              className="apple-card p-4 cursor-move hover:shadow-lg apple-transition"
            >
              <h3 className="text-sm font-medium mb-2 text-apple-gray-700 dark:text-apple-gray-300">{widget.title}</h3>
              <div className="h-24 overflow-hidden rounded-apple bg-apple-gray-100 dark:bg-apple-gray-700">
                <widget.component />
              </div>
            </div>
          ))}
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-hidden">
        <header className="flex justify-between items-center mb-8">
          <Input type="search" placeholder="Search..." className="apple-input w-64 rounded-full" />
          <div className="flex items-center space-x-4">
            <Button onClick={saveLayout} className="apple-button rounded-full">
              Save Layout
            </Button>
            <Button onClick={deployLayout} className="apple-button bg-green-500 hover:bg-green-600 rounded-full">
              Deploy
            </Button>
          </div>
        </header>
        <div
          ref={containerRef}
          className="h-[calc(100vh-10rem)] rounded-apple p-4 overflow-auto relative bg-white dark:bg-apple-gray-800 shadow-apple"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            onLayoutChange={onLayoutChange}
            isDraggable
            isResizable
            isBounded={false}
            preventCollision={false}
            draggableCancel=".no-drag"
            margin={[16, 16]}
          >
            {layout.map((widget) =>
              widget && widget.i ? (
                <div
                  key={widget.i}
                  data-grid={{
                    ...widget,
                    minW: 1,
                    maxW: 12,
                    minH: 1,
                    maxH: 10,
                  }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden relative rounded-apple shadow-apple apple-transition">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="no-drag absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full text-apple-gray-500 hover:text-apple-gray-700 dark:text-apple-gray-400 dark:hover:text-apple-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleDeleteWidget(widget.i);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <CardHeader className="p-4">
                      <CardTitle className="text-xl font-semibold text-apple-gray-900 dark:text-white">{widgets[widget.type || '']?.title || 'Unknown Widget'}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 overflow-auto h-[calc(100%-4rem)]">
                      {renderWidget(widget)}
                    </CardContent>
                  </Card>
                </div>
              ) : null
            )}
          </ResponsiveGridLayout>
        </div>
      </main>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px] apple-card">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-apple-gray-900 dark:text-white">Delete Widget</DialogTitle>
            <DialogDescription className="text-apple-gray-500 dark:text-apple-gray-400">
              Are you sure you want to delete this widget? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="apple-button bg-apple-gray-200 text-apple-gray-800 hover:bg-apple-gray-300">
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} className="apple-button bg-red-500 hover:bg-red-600">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}