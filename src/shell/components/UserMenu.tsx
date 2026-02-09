import { useState, useRef, useEffect } from 'react'
import { LogOut, ChevronDown } from 'lucide-react'

interface UserMenuProps {
  user: { name: string; avatarUrl?: string }
  onLogout?: () => void
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
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

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-[10px] font-medium text-zinc-600 dark:text-zinc-300">
            {initials}
          </div>
        )}
        <span className="hidden sm:inline font-medium">{user.name}</span>
        <ChevronDown className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.5} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg py-1 z-50">
          <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.name}</p>
          </div>
          <button
            onClick={() => {
              setOpen(false)
              onLogout?.()
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.5} />
            Log out
          </button>
        </div>
      )}
    </div>
  )
}
