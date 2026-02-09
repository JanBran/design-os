import { useState, useRef, useCallback, useEffect } from 'react'
import MainNav from './MainNav'
import UserMenu from './UserMenu'

const DEFAULT_CHAT_WIDTH = 320
const MIN_CHAT_WIDTH = 280
const MAX_CHAT_WIDTH = 600

interface AppShellProps {
  children: React.ReactNode
  chatPanel?: React.ReactNode
  user?: { name: string; avatarUrl?: string }
  onLogout?: () => void
}

export default function AppShell({ children, chatPanel, user, onLogout }: AppShellProps) {
  const [chatOpen, setChatOpen] = useState(true)
  const [chatWidth, setChatWidth] = useState(DEFAULT_CHAT_WIDTH)
  const [isMobile, setIsMobile] = useState(false)
  const isDragging = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Detect mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleMouseDown = useCallback(() => {
    isDragging.current = true

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      const newWidth = Math.max(MIN_CHAT_WIDTH, Math.min(MAX_CHAT_WIDTH, e.clientX))
      setChatWidth(newWidth)
    }

    const handleMouseUp = () => {
      isDragging.current = false
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = 'ew-resize'
    document.body.style.userSelect = 'none'
  }, [])

  const defaultUser = { name: 'Alex Morgan' }
  const currentUser = user || defaultUser

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-zinc-950" style={{ fontFamily: '"Geist", system-ui, sans-serif' }}>
      {/* Header */}
      <header className="h-12 shrink-0 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4">
        <MainNav
          productName="TestTakify"
          chatOpen={chatOpen}
          onToggleChat={() => setChatOpen(!chatOpen)}
        />
        <UserMenu user={currentUser} onLogout={onLogout} />
      </header>

      {/* Main content area */}
      <div ref={containerRef} className="flex-1 flex overflow-hidden relative">
        {/* Chat panel - desktop: side-by-side, mobile: overlay */}
        {chatOpen && (
          <>
            {isMobile ? (
              /* Mobile: full-screen overlay */
              <div className="absolute inset-0 z-40 bg-white dark:bg-zinc-950 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  {chatPanel || <ChatPlaceholder />}
                </div>
              </div>
            ) : (
              /* Desktop: resizable side panel */
              <div
                className="shrink-0 border-r border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden"
                style={{ width: chatWidth }}
              >
                <div className="flex-1 overflow-y-auto">
                  {chatPanel || <ChatPlaceholder />}
                </div>
              </div>
            )}
          </>
        )}

        {/* Resize handle (desktop only) */}
        {chatOpen && !isMobile && (
          <div
            className="w-1 shrink-0 cursor-ew-resize hover:bg-blue-500/20 active:bg-blue-500/30 transition-colors group relative"
            onMouseDown={handleMouseDown}
          >
            <div className="absolute inset-y-0 -left-1 -right-1" />
          </div>
        )}

        {/* Task board content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

function ChatPlaceholder() {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Team Chat</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">3 members online</p>
      </div>
      <div className="flex-1 p-4 space-y-4">
        {/* Sample messages */}
        <div className="flex gap-2.5">
          <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-[10px] font-medium text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
            SR
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Sarah R.</span>
              <span className="text-[10px] text-zinc-400">10:32 AM</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
              Just pushed the API changes. Ready for review.
            </p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-[10px] font-medium text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
            JK
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">James K.</span>
              <span className="text-[10px] text-zinc-400">10:35 AM</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
              On it. I'll take a look after standup.
            </p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-[10px] font-medium text-zinc-600 dark:text-zinc-300 shrink-0 mt-0.5">
            AM
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Alex M.</span>
              <span className="text-[10px] text-zinc-400">10:38 AM</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
              Sounds good. I moved the auth task to In Progress btw.
            </p>
          </div>
        </div>
      </div>
      {/* Message input */}
      <div className="p-3 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none"
            readOnly
          />
        </div>
      </div>
    </div>
  )
}
