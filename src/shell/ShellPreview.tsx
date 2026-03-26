import AppShell from './components/AppShell'

export default function ShellPreview() {
  const navigationItems = [
    { label: 'Section One', href: '/section-one', isActive: true },
    { label: 'Section Two', href: '/section-two' },
    { label: 'Section Three', href: '/section-three' },
  ]

  return (
    <AppShell
      navigationItems={navigationItems}
      user={{ name: 'Jane Smith' }}
      onNavigate={(href) => console.log('Navigate to:', href)}
      onLogout={() => console.log('Logout')}
    >
      <ContentPlaceholder />
    </AppShell>
  )
}

function ContentPlaceholder() {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-950">
      {/* Header bar */}
      <div className="h-11 shrink-0 border-b border-slate-200 dark:border-slate-800 flex items-center px-6">
        <div className="h-4 w-40 rounded bg-slate-100 dark:bg-slate-800" />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3"
            >
              <div className="h-3 w-24 rounded bg-slate-100 dark:bg-slate-800" />
              <div className="h-7 w-32 rounded bg-slate-100 dark:bg-slate-800" />
              <div className="h-2 w-16 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 h-48 flex items-center justify-center">
          <span className="text-sm text-slate-400 dark:text-slate-600">Content area</span>
        </div>

        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 h-32 flex items-center justify-center">
          <span className="text-sm text-slate-400 dark:text-slate-600">Content area</span>
        </div>
      </div>
    </div>
  )
}
