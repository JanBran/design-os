import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { Task, Label, User, Column } from '@/../product/sections/task-board/types'
import { TaskCard } from './TaskCard'

interface KanbanColumnProps {
  column: Column
  tasks: Task[]
  labels: Label[]
  users: User[]
  onViewTask?: (taskId: string) => void
  onQuickAddTask?: (title: string, columnId: string) => void
}

const columnDotColor: Record<string, string> = {
  'To Do': 'bg-zinc-400 dark:bg-zinc-500',
  'In Progress': 'bg-blue-500',
  'In Review': 'bg-amber-500',
  'Done': 'bg-emerald-500',
}

export function KanbanColumn({
  column,
  tasks,
  labels,
  users,
  onViewTask,
  onQuickAddTask,
}: KanbanColumnProps) {
  const [quickAddValue, setQuickAddValue] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const handleQuickAdd = () => {
    if (quickAddValue.trim()) {
      onQuickAddTask?.(quickAddValue.trim(), column.id)
      setQuickAddValue('')
      setIsAdding(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleQuickAdd()
    } else if (e.key === 'Escape') {
      setQuickAddValue('')
      setIsAdding(false)
    }
  }

  const dotColor = columnDotColor[column.name] || 'bg-zinc-400'

  return (
    <div className="w-72 shrink-0 flex flex-col max-h-full">
      {/* Column header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className={`w-2 h-2 rounded-full ${dotColor}`} />
        <h3 className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 tracking-tight">
          {column.name}
        </h3>
        <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 tabular-nums ml-auto">
          {tasks.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto space-y-2 pb-2 min-h-[80px]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            labels={labels}
            users={users}
            onView={() => onViewTask?.(task.id)}
          />
        ))}
      </div>

      {/* Quick add */}
      {isAdding ? (
        <div className="mt-1">
          <input
            type="text"
            value={quickAddValue}
            onChange={(e) => setQuickAddValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (!quickAddValue.trim()) setIsAdding(false)
            }}
            placeholder="Task title..."
            autoFocus
            className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-zinc-400"
          />
          <div className="flex items-center gap-1.5 mt-1.5">
            <button
              onClick={handleQuickAdd}
              className="px-2.5 py-1 text-[11px] font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setQuickAddValue('')
                setIsAdding(false)
              }}
              className="px-2.5 py-1 text-[11px] font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 w-full px-2 py-1.5 mt-1 rounded-md text-[12px] text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
          Add task
        </button>
      )}
    </div>
  )
}
