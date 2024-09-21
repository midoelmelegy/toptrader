'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Responsive, WidthProvider, Layout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { X, Sun, Moon, ChevronLeft, ChevronRight, Pencil, ChevronUp, ChevronDown } from 'lucide-react'

// Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, Settings, LogOut } from 'lucide-react'

// Widgets
import { TradingVaultComponent } from './widgets/TradingVault'
import { RankingSystemComponent } from './widgets/RankingSystem'
import { CustomMetricsComponent } from './widgets/CustomMetrics'
import { ChatComponent } from './widgets/Chat'
import { SpotPortfolio } from './widgets/trading/spot-portfolio'
import { TradeSignal } from './widgets/trading/trade-signal'
import { AnnounceBanner } from './widgets/general/announce-banner'
import { Countdown } from './widgets/general/countdown'
import { EventCalendar } from './widgets/general/event-calendar'
import { MediaCarousel } from './widgets/general/media-carousel'
import { Poll } from './widgets/general/poll'
import CollaborativeTradingWidget from './vault/CollaborativeTradingWidget'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { doc, setDoc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore"
import { auth, db } from '@/lib/firebase'
import { useAuth } from '@/lib/useAuth'
import { useRouter } from 'next/navigation'
import { VaultProvider } from '../contexts/VaultContext'

const ResponsiveGridLayout = WidthProvider(Responsive)

// Widgets object
const widgets: Widgets = {
  tradingVault: { type: 'tradingVault', title: 'Trading Vault', w: 4, h: 4, component: TradingVaultComponent },
  rankingSystem: { type: 'rankingSystem', title: 'Ranking System', w: 4, h: 4, component: RankingSystemComponent },
  customMetrics: { type: 'customMetrics', title: 'Custom Metrics', w: 3, h: 3, component: CustomMetricsComponent },
  chat: { type: 'chat', title: 'Chat', w: 3, h: 4, component: ChatComponent },
  spotPortfolio: { type: 'spotPortfolio', title: 'Spot Portfolio', w: 4, h: 4, component: SpotPortfolio },
  tradeSignal: { type: 'tradeSignal', title: 'Trade Signal', w: 3, h: 4, component: TradeSignal },
  announceBanner: { type: 'announceBanner', title: 'Announce Banner', w: 4, h: 2, component: AnnounceBanner },
  countdown: { type: 'countdown', title: 'Countdown', w: 3, h: 3, component: Countdown },
  eventCalendar: { type: 'eventCalendar', title: 'Event Calendar', w: 4, h: 4, component: EventCalendar },
  mediaCarousel: { type: 'mediaCarousel', title: 'Media Carousel', w: 4, h: 4, component: MediaCarousel },
  poll: { type: 'poll', title: 'Poll', w: 3, h: 4, component: Poll },
  collaborativeTrading: { type: 'collaborativeTrading', title: 'Collaborative Trading', w: 4, h: 4, component: CollaborativeTradingWidget },
}

// Type definitions
type WidgetComponentType = React.ComponentType<any>

interface WidgetDefinition {
  type: string
  title: string
  w: number
  h: number
  component: WidgetComponentType
}

interface Widgets {
  [key: string]: WidgetDefinition
}

interface DashboardComponentProps {
  id?: string | null;
  isOwner?: boolean;
}

export function DashboardComponent({ id = null, isOwner = false }: DashboardComponentProps) {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [layout, setLayout] = useState<Array<Layout & { type?: string }>>([])
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const [theme, setTheme] = useState<string>('dark')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [widgetToDelete, setWidgetToDelete] = useState<string | null>(null)
  const [widgetData, setWidgetData] = useState<{[key: string]: any}>({})
  const [communityData, setCommunityData] = useState<any>(null)

  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)
  const [editedCommunityName, setEditedCommunityName] = useState<string>('')
  const [editedCommunityDescription, setEditedCommunityDescription] = useState<string>('')
  const [editedCommunityIcon, setEditedCommunityIcon] = useState<string>('')
  const [updatingCommunity, setUpdatingCommunity] = useState<boolean>(false)

  const [isCommunityInfoCollapsed, setIsCommunityInfoCollapsed] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const widgetsPerPage = 4

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    // Fetch community data if id is provided
    const fetchCommunityData = async () => {
      if (id) {
        try {
          const communityRef = doc(db, 'communities', id)
          const communityDoc = await getDoc(communityRef)
          if (communityDoc.exists()) {
            setCommunityData(communityDoc.data())
          }
        } catch (error) {
          console.error('Error fetching community data:', error)
        }
      }
    }
    fetchCommunityData()
  }, [id])

  useEffect(() => {
    if (communityData) {
      setEditedCommunityName(communityData.name || '')
      setEditedCommunityDescription(communityData.description || '')
      setEditedCommunityIcon(communityData.icon || '')
    }
  }, [communityData])

  const handleUpdateCommunity = async () => {
    if (!id) return
    setUpdatingCommunity(true)
    try {
      const communityRef = doc(db, 'communities', id)
      await updateDoc(communityRef, {
        name: editedCommunityName,
        description: editedCommunityDescription,
        icon: editedCommunityIcon,
      })
      setEditDialogOpen(false)
      // Update local state
      setCommunityData((prevData: any) => ({
        ...prevData,
        name: editedCommunityName,
        description: editedCommunityDescription,
        icon: editedCommunityIcon,
      }))
    } catch (error) {
      console.error('Error updating community:', error)
      alert('Failed to update community. Please try again.')
    } finally {
      setUpdatingCommunity(false)
    }
  }

  const loadDeployedLayout = useCallback(async () => {
    if (id) {
      try {
        const communityRef = doc(db, 'communities', id);
        const communityDoc = await getDoc(communityRef);
        if (communityDoc.exists()) {
          const deployedLayout = communityDoc.data().deployedLayout;
          if (deployedLayout && Array.isArray(deployedLayout)) {
            const layoutToLoad = deployedLayout.map(item => ({
              i: item.i || `${item.type}-${Date.now()}`,
              type: item.type,
              x: item.x,
              y: item.y,
              w: item.w,
              h: item.h,
            }));
            setLayout(layoutToLoad);
          } else {
            console.error('No deployed layout found for this community.');
          }
        } else {
          console.error('Community document does not exist.');
        }
      } catch (error) {
        console.error('Error loading deployed layout:', error);
      }
    }
  }, [id]);


  const loadLayout = useCallback(async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You need to log in first');
        return;
      }
  
      // Reference to the user's layout document in Firestore
      const layoutDocRef = doc(db, 'userLayouts', user.uid);
  
      // Fetch the layout document from Firestore
      const layoutDoc = await getDoc(layoutDocRef);
  
      if (layoutDoc.exists()) {
        const savedLayout = layoutDoc.data().layout;
  
        // Check if the layout has valid data and update the state
        if (savedLayout && Array.isArray(savedLayout)) {
          const layoutToLoad = savedLayout.map(item => ({
            i: item.i || `${item.type}-${Date.now()}`,  // Unique identifier for the widget
            type: item.type,
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
          }));
  
          setLayout(layoutToLoad);  // Update the layout state with the saved layout
          console.log('Layout loaded successfully:', layoutToLoad);  // Log the saved layout for debugging
        } else {
          console.error('No valid layout found for this user.');
        }
      } else {
        console.log('No layout found for this user.');
      }
    } catch (error) {
      console.error('Error loading layout:', error);
      alert('Failed to load layout. Please try again.');
    }
  }, []);

  useEffect(() => {
    if (id) {
      loadDeployedLayout(); // Load the deployed layout for the community
    } else {
      loadLayout(); // Load user-specific editable layout
    }
  }, [id, loadDeployedLayout, loadLayout]);

  // Determine if the dashboard is editable based on isOwner
  const isEditable = isOwner && id !== null

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const onLayoutChange = useCallback((newLayout: Layout[]) => {
    setLayout((prevLayout) =>
      newLayout.map((item) => {
        const existingItem = prevLayout.find((layoutItem) => layoutItem.i === item.i);
        return { ...item, type: existingItem?.type || item.i.split('-')[0] };
      })
    );
  }, []);
  

  const onDragStart = useCallback((e: React.DragEvent, widgetType: string) => {
    e.dataTransfer.setData('text/plain', widgetType)
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      if (!isEditable) return
      e.preventDefault()
      const widgetType = e.dataTransfer.getData('text')
      if (widgetType in widgets) {
        // Calculate total occupied grid squares
        const totalOccupied = layout.reduce((acc, item) => acc + item.w * item.h, 0)
        const totalGridSize = 12 * 10 // cols * maxRows

        // Calculate new widget size
        const newWidgetSize = widgets[widgetType].w * widgets[widgetType].h

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
          }
          setLayout((prevLayout) => [...prevLayout, newWidget])
          setWidgetData((prevData) => ({
            ...prevData,
            [newWidget.i]: {} // Initialize empty data or default values
          }))
        } else {
          alert('Not enough space to add this widget.')
        }
      }
    },
    [layout, isEditable]
  )

  const handleDeleteWidget = useCallback((widgetId: string) => {
    if (!isEditable) return
    setWidgetToDelete(widgetId)
    setDialogOpen(true)
  }, [isEditable])

  const confirmDelete = useCallback(() => {
    if (widgetToDelete) {
      setLayout((prevLayout) => prevLayout.filter((item) => item.i !== widgetToDelete))
      setWidgetToDelete(null)
    }
    setDialogOpen(false)
  }, [widgetToDelete])

  const renderWidget = useCallback((widget: any) => {
    if (!widget || !widget.type) {
      return <div>Invalid widget</div>
    }
    const WidgetComponent = widgets[widget.type]?.component
    if (!WidgetComponent) {
      return <div>Widget not found</div>
    }
    return (
      <ErrorBoundary fallback={<div>Error loading widget</div>}>
        <WidgetComponent
          id={widget.i}
          data={widgetData[widget.i]}
          setData={(data: any) => setWidgetData((prevData) => ({ ...prevData, [widget.i]: data }))}
        />
      </ErrorBoundary>
    )
  }, [widgetData])

  // You'll need to create an ErrorBoundary component
  class ErrorBoundary extends React.Component<{children: React.ReactNode, fallback: React.ReactNode}> {
    state = { hasError: false }
    static getDerivedStateFromError() {
      return { hasError: true }
    }
    render() {
      if (this.state.hasError) {
        return this.props.fallback
      }
      return this.props.children
    }
  }

  const saveLayout = useCallback(async () => {
    if (!isEditable) return
    try {
      if (!user) {
        alert('You need to log in first');
        console.error('User is not logged in');
        return;
      }

      const layoutToSave = layout.map(item => ({
        i: item.i,
        type: item.type,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h
      }));

      const layoutDocRef = doc(db, 'userLayouts', user.uid);

      await setDoc(layoutDocRef, { layout: layoutToSave }, { merge: true });

      alert('Layout saved successfully!');
    } catch (error) {
      console.error('Error saving layout:', error);
      alert('Failed to save layout. Please try again.');
    }
  }, [layout, user, isEditable])

  const deployLayout = useCallback(async () => {
    if (!isEditable) return
    try {
      if (!user) {
        alert('You need to log in first');
        console.error('User is not logged in');
        return;
      }

      if (!id) {
        alert('Community ID is missing.');
        return;
      }

      // Prepare the layout to save
      const layoutToSave = layout.map(item => ({
        i: item.i,
        type: item.type,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h
      }));

      // Document reference for the community
      const communityRef = doc(db, 'communities', id);

      // Save the layout under the community document
      await updateDoc(communityRef, { deployedLayout: layoutToSave });

      alert('Dashboard deployed successfully!');
    } catch (error) {
      console.error('Error deploying dashboard:', error);
      alert('Failed to deploy dashboard. Please try again.');
    }
  }, [layout, isEditable, id, user]);
  

  const toggleTheme = useCallback(() => {
    const root = document.documentElement
    root.classList.toggle('dark')
    const newTheme = root.classList.contains('dark') ? 'dark' : 'light'
    setTheme(newTheme)
  }, [])

  // Calculate the widgets to display on the current page
  const widgetEntries = Object.entries(widgets)
  const indexOfLastWidget = currentPage * widgetsPerPage
  const indexOfFirstWidget = indexOfLastWidget - widgetsPerPage
  const currentWidgets = widgetEntries.slice(indexOfFirstWidget, indexOfLastWidget)

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  const totalWidgets = Object.keys(widgets).length
  const totalPages = Math.ceil(totalWidgets / widgetsPerPage)

  return (
    <div className="flex h-screen bg-apple-gray-100 dark:bg-apple-gray-900">
      {isEditable &&
      <aside className={`flex top-0 left-0 h-full z-10 ${isSidebarCollapsed ? 'w-16' : 'w-64'} p-6 bg-white dark:bg-apple-gray-800 shadow-apple rounded-r-apple transition-all duration-300 ease-in-out flex flex-col`}>
        <div className="flex justify-between items-center mb-8">
          {!isSidebarCollapsed && <h2 className="text-2xl font-semibold text-apple-gray-900 dark:text-white">Widgets</h2>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-apple-gray-500 hover:text-apple-gray-700 dark:text-apple-gray-400 dark:hover:text-apple-gray-200"
          >
            {isSidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
        {!isSidebarCollapsed && (
          <>
            <div className="space-y-4 flex-grow overflow-auto">
              {currentWidgets.map(([key, widget]) => (
                <div
                  key={key}
                  draggable
                  onDragStart={(e) => onDragStart(e, key)}
                  className="apple-card p-4 cursor-move hover:shadow-lg apple-transition"
                >
                  <h3 className="text-sm font-medium mb-2 text-apple-gray-700 dark:text-apple-gray-300">
                    {widget.title}
                  </h3>
                  <div className="h-24 overflow-hidden rounded-apple bg-apple-gray-100 dark:bg-apple-gray-700">
                    <widget.component />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-apple-gray-700 dark:text-apple-gray-300">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </aside>
      }
      <main className="flex-1 p-8 overflow-hidden">
        {isEditable && (
          <div className={`mb-4 ${isCommunityInfoCollapsed ? 'h-16 overflow-hidden' : 'h-auto'} transition-all duration-300`}>
            <div className="flex items-center justify-between">
              {/* Community Info */}
              <div className="flex items-center">
                {communityData && (
                  <div className="flex items-center">
                    <div className="h-16 w-16 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full text-3xl mr-4">
                      {communityData.icon}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{communityData.name}</h1>
                      {!isCommunityInfoCollapsed && (
                        <p className="text-gray-600 dark:text-gray-300">{communityData.description}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Buttons and Collapse Toggle */}
              <div className="flex items-center space-x-2">
                {/* Save and Deploy buttons */}
                <Button onClick={saveLayout} className="apple-button rounded-full">
                  Save Layout
                </Button>
                <Button onClick={deployLayout} className="apple-button bg-green-500 hover:bg-green-600 rounded-full">
                  Deploy
                </Button>
                {/* Edit Community Button */}
                {communityData && (
                  <Button onClick={() => setEditDialogOpen(true)} className="apple-button rounded-full flex items-center">
                    <Pencil className="h-4 w-4 mr-2" /> Edit Community
                  </Button>
                )}
                {/* Collapse Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCommunityInfoCollapsed(!isCommunityInfoCollapsed)}
                  className="text-gray-600 dark:text-gray-300"
                >
                  {isCommunityInfoCollapsed ? <ChevronDown /> : <ChevronUp />}
                </Button>
              </div>
            </div>
          </div>
        )}
        <div
          ref={containerRef}
          className="h-[calc(100vh-8rem)] rounded-apple p-4 overflow-auto relative bg-white dark:bg-apple-gray-800 shadow-apple"
          onDragOver={(e) => isEditable && e.preventDefault()}
          onDrop={isEditable ? onDrop : undefined}
        >
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            onLayoutChange={onLayoutChange}
            isDraggable={isEditable}
            isResizable={isEditable}
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
                    {isEditable && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="no-drag absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full text-apple-gray-500 hover:text-apple-gray-700 dark:text-apple-gray-400 dark:hover:text-apple-gray-200"
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          handleDeleteWidget(widget.i)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
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

        {/* Edit Community Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Community</DialogTitle>
              <DialogDescription>Edit the details of your community.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-community-name">Community Name</Label>
                <Input
                  id="edit-community-name"
                  value={editedCommunityName}
                  onChange={(e) => setEditedCommunityName(e.target.value)}
                  placeholder="Enter community name"
                />
              </div>
              <div>
                <Label htmlFor="edit-community-description">Description</Label>
                <Textarea
                  id="edit-community-description"
                  value={editedCommunityDescription}
                  onChange={(e) => setEditedCommunityDescription(e.target.value)}
                  placeholder="Enter community description"
                />
              </div>
              <div>
                <Label htmlFor="edit-community-icon">Icon</Label>
                <Input
                  id="edit-community-icon"
                  value={editedCommunityIcon}
                  onChange={(e) => setEditedCommunityIcon(e.target.value)}
                  placeholder="Enter an emoji or icon"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateCommunity} disabled={updatingCommunity}>
                {updatingCommunity ? 'Updating...' : 'Update Community'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
  )
}

export default DashboardComponent;