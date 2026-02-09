import { Calendar, GripVertical } from 'lucide-react'
import type { Task, Label, User } from '@/../product/sections/task-board/types'

interface TaskCardProps {
  task: Task
  labels: Label[]
  users: User[]
  onView?: () => void
}

const labelColorMap: Record<string, { bg: string; text: string }> = {
  sky: { bg: 'bg-sky-100 dark:bg-sky-900/30', text: 'text-sky-700 dark:text-sky-400' },
  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400' },
  violet: { bg: 'bg-violet-100 dark:bg-violet-900/30', text: 'text-violet-700 dark:text-violet-400' },
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400' },
  amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400' },
  red: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400' },
}

const priorityConfig: Record<string, { dot: string; label: string }> = {
  high: { dot: 'bg-red-500', label: 'High' },
  medium: { dot: 'bg-amber-500', label: 'Medium' },
  low: { dot: 'bg-zinc-400 dark:bg-zinc-500', label: 'Low' },
}

export function TaskCard({ task, labels, users, onView }: TaskCardProps) {
  const taskLabels = labels.filter((l) => task.labelIds.includes(l.id))
  const assignee = users.find((u) => u.id === task.assigneeId)
  const priority = priorityConfig[task.priority]

  const initials = assignee
    ? assignee.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '?'

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div
      onClick={onView}
      className="group relative rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all cursor-pointer"
    >
      {/* Drag handle - visible on hover */}
      <div className="absolute -left-0.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100 leading-snug mb-2.5 pr-1">
        {task.title}
      </p>

      {/* Labels */}
      {taskLabels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2.5">
          {taskLabels.map((label) => {
            const colors = labelColorMap[label.color] || labelColorMap.blue
            return (
              <span
                key={label.id}
                className={`inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded ${colors.bg} ${colors.text}`}
              >
                {label.name}
              </span>
            )
          })}
        </div>
      )}

      {/* Footer: priority, due date, assignee */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Priority */}
          <div className="flex items-center gap-1" title={`${priority.label} priority`}>
            <div className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{priority.label}</span>
          </div>

          {/* Due date */}
          {task.dueDate && (
            <div className="flex items-center gap-1 text-zinc-400 dark:text-zinc-500">
              <Calendar className="w-3 h-3" strokeWidth={1.5} />
              <span className="text-[10px]">{formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>

        {/* Assignee avatar */}
        {assignee && (
          <div
            className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-[8px] font-semibold text-zinc-600 dark:text-zinc-300 shrink-0"
            title={assignee.name}
          >
            {initials}
          </div>
        )}
      </div>
    </div>
  )
}
