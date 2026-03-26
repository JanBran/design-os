interface NavItem {
  label: string
  href: string
  isActive?: boolean
}

interface MainNavProps {
  items: NavItem[]
  onNavigate?: (href: string) => void
  collapsed?: boolean
}

export default function MainNav({ items, onNavigate, collapsed }: MainNavProps) {
  return (
    <nav className="space-y-0.5">
      {items.map((item) => (
        <button
          key={item.href}
          onClick={() => onNavigate?.(item.href)}
          title={collapsed ? item.label : undefined}
          className={`w-full flex items-center rounded-md transition-colors text-left ${
            collapsed ? 'justify-center p-2.5' : 'gap-2.5 px-3 py-2 text-sm'
          } ${
            item.isActive
              ? 'bg-blue-100 dark:bg-blue-900/30 text-slate-900 dark:text-blue-300 font-medium'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <div
            className={`w-4 h-4 rounded shrink-0 ${
              item.isActive
                ? 'bg-blue-400 dark:bg-blue-500'
                : 'bg-slate-300 dark:bg-slate-700'
            }`}
          />
          {!collapsed && item.label}
        </button>
      ))}
    </nav>
  )
}
