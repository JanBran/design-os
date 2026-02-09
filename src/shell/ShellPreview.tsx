import AppShell from './components/AppShell'

export default function ShellPreview() {
  return (
    <AppShell
      user={{ name: 'Alex Morgan' }}
      onLogout={() => console.log('Logout')}
    >
      {/* Sample task board content */}
      <div className="h-full flex flex-col" style={{ fontFamily: '"Geist", system-ui, sans-serif' }}>
        {/* View tabs bar */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 px-4">
          <div className="flex items-center gap-1 -mb-px">
            <button className="px-3 py-2.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 border-b-2 border-zinc-900 dark:border-zinc-100">
              Sprint Board
            </button>
            <button className="px-3 py-2.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 border-b-2 border-transparent">
              Backlog
            </button>
            <button className="px-3 py-2.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 border-b-2 border-transparent">
              My Tasks
            </button>
            <button className="px-2 py-2.5 text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300">
              +
            </button>
          </div>
        </div>

        {/* Board content */}
        <div className="flex-1 overflow-x-auto p-4">
          <div className="flex gap-4 h-full">
            {/* To Do column */}
            <div className="w-72 shrink-0 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-zinc-400" />
                <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">To Do</h3>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-auto">3</span>
              </div>
              <div className="space-y-2">
                <TaskCard title="Set up CI/CD pipeline" label="DevOps" labelColor="blue" priority="high" assignee="SR" />
                <TaskCard title="Design onboarding flow" label="Design" labelColor="violet" priority="medium" assignee="AM" />
                <TaskCard title="Write API documentation" label="Docs" labelColor="amber" priority="low" assignee="JK" />
              </div>
            </div>

            {/* In Progress column */}
            <div className="w-72 shrink-0 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">In Progress</h3>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-auto">2</span>
              </div>
              <div className="space-y-2">
                <TaskCard title="Implement auth endpoints" label="Backend" labelColor="emerald" priority="high" assignee="AM" />
                <TaskCard title="Build task list component" label="Frontend" labelColor="sky" priority="medium" assignee="SR" />
              </div>
            </div>

            {/* Done column */}
            <div className="w-72 shrink-0 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Done</h3>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-auto">2</span>
              </div>
              <div className="space-y-2">
                <TaskCard title="Project scaffolding" label="DevOps" labelColor="blue" priority="medium" assignee="JK" />
                <TaskCard title="Database schema design" label="Backend" labelColor="emerald" priority="high" assignee="AM" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

function TaskCard({
  title,
  label,
  labelColor,
  priority,
  assignee,
}: {
  title: string
  label: string
  labelColor: string
  priority: 'high' | 'medium' | 'low'
  assignee: string
}) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    violet: 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',
    amber: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    sky: 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400',
  }

  const priorityDot: Record<string, string> = {
    high: 'bg-red-500',
    medium: 'bg-amber-500',
    low: 'bg-zinc-400',
  }

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">{title}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${colorMap[labelColor] || colorMap.blue}`}>
            {label}
          </span>
          <div className={`w-1.5 h-1.5 rounded-full ${priorityDot[priority]}`} title={`${priority} priority`} />
        </div>
        <div className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-[8px] font-medium text-zinc-600 dark:text-zinc-300">
          {assignee}
        </div>
      </div>
    </div>
  )
}
