import { useState } from 'react'
import { ChevronLeft, Box } from 'lucide-react'
import MainNav from './MainNav'
import UserMenu from './UserMenu'

interface AppShellProps {
  children: React.ReactNode
  navigationItems: Array<{ label: string; href: string; isActive?: boolean }>
  user?: { name: string; avatarUrl?: string }
  onNavigate?: (href: string) => void
  onLogout?: () => void
}

export default function AppShell({
  children,
  navigationItems,
  user,
  onNavigate,
  onLogout,
}: AppShellProps) {
  const currentUser = user || { name: 'User' }
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="h-screen flex bg-white dark:bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? 'w-14' : 'w-56'
        } shrink-0 flex flex-col bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-[width] duration-200`}
      >
        {/* Logo */}
        <div
          className={`h-14 shrink-0 flex items-center border-b border-slate-200 dark:border-slate-800 ${
            collapsed
              ? 'justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
              : 'px-3 justify-between'
          }`}
          onClick={collapsed ? () => setCollapsed(false) : undefined}
          title={collapsed ? 'Expand sidebar' : undefined}
        >
          {collapsed ? (
            <Box className="w-5 h-5 text-slate-900 dark:text-slate-100 shrink-0" strokeWidth={1.5} />
          ) : (
            <>
              <div className="flex items-center gap-2.5">
                <Box className="w-5 h-5 text-slate-900 dark:text-slate-100 shrink-0" strokeWidth={1.5} />
                <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  My App
                </span>
              </div>
              <button
                onClick={() => setCollapsed(true)}
                title="Collapse sidebar"
                className="w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-2">
          <MainNav items={navigationItems} onNavigate={onNavigate} collapsed={collapsed} />
        </div>

        {/* User menu */}
        <div className="shrink-0 p-2 border-t border-slate-200 dark:border-slate-800">
          <UserMenu user={currentUser} onLogout={onLogout} collapsed={collapsed} />
        </div>
      </aside>

      {/* Content area */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
