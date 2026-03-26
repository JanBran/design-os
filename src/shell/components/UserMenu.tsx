import { useState, useRef, useEffect } from 'react'
import { LogOut, ChevronUp } from 'lucide-react'

interface UserMenuProps {
  user: { name: string; avatarUrl?: string }
  onLogout?: () => void
  collapsed?: boolean
}

export default function UserMenu({ user, onLogout, collapsed }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const avatar = user.avatarUrl ? (
    <img src={user.avatarUrl} alt={user.name} className="w-6 h-6 rounded-full object-cover shrink-0" />
  ) : (
    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-semibold text-slate-600 dark:text-slate-300 shrink-0">
      {initials}
    </div>
  )

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        title={collapsed ? user.name : undefined}
        className={`w-full flex items-center rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors ${
          collapsed ? 'justify-center p-2.5' : 'gap-2.5 px-3 py-2 text-sm'
        }`}
      >
        {avatar}
        {!collapsed && (
          <>
            <span className="flex-1 text-left font-medium truncate">{user.name}</span>
            <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={1.5} />
          </>
        )}
      </button>

      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg py-1 z-50">
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{user.name}</p>
          </div>
          <button
            onClick={() => {
              setOpen(false)
              onLogout?.()
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.5} />
            Log out
          </button>
        </div>
      )}
    </div>
  )
}
